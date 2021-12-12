import React from "react";
import {View, Text, Image, FlatList, TouchableHighlight, Button, Picker, TextInput, AsyncStorage } from "react-native";
import { Input, Icon} from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import styles from './styles';
// import { spending } from '../../data/dataArrays';
import Modal from 'react-native-modal';
import DateTimePicker from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
export default class SpendingHistory extends React.Component {
    state = {
      // visibleModal: 1,
      visibleModal: null,
      choosenIndex: 0,
      datePickerVisible: false,
      date: "",
      checked: "first",
      idLG: "",
      spendingSV: null,
      ItemSP: "",
      objSpending: {},
      refreshing: true,
      priceInt: 0,
      mess: "",
      count: 0,
      
      kSearch:"",
      kDate: 1,
      kCategoryCount: 10,
      kCategory:[
        {
          id: 0,
          status: true,
          name: 'Khoản thu khác',
        },
        {
          id: 1,
          status: true,
          name: 'Nhận lương',
        },
        {
          id: 2,
          status: true,
          name: 'Tiền thưởng',
        },
        {
          id: 3,
          status: true,
          name: 'Lãi ngân hàng',
        },
        {
          id: 4,
          status: true,
          name: 'Khoản chi khác',
        },
        {
          id: 5,
          status: true,
          name: 'Sinh hoạt',
        },
        {
          id: 6,
          status: true,
          name: 'Học tập',
        },
        {
          id: 7,
          status: true,
          name: 'Y tế',
        },
        {
          id: 8,
          status: true,
          name: 'Giải trí',
        },
        {
          id: 9,
          status: true,
          name: 'Mua sắm',
        },
      ]
    };

    componentDidMount() {
      // this.getDate();
      // console.log(this.state.kCategory[3].name)

      AsyncStorage.getItem('idLG').then((idLG) => {
        this.setState({ idLG: idLG !== null, idLG: idLG })
      });
      this._refreshDataSpending(this.state.idLG);
    }
    
    updateObject = (key, value) => {
      console.log("value is ", key + " "+ value)
      const objSpending = this.state.ItemSP;
      objSpending[key] = value;
      this.setState({ItemSP: objSpending})
      // console.log("./objSpending update...............................", this.state.ItemSP)
    }

    //create data spending
    _newSpending = async() => {
      this.setState({
        visibleModal: 1,
        ItemSP: {
          category: "Chưa xếp loại",
          datec: new Date(),
          dateu: "",
          day: "",
          dd: "",
          mm: "",
          name: "",
          pay: false,
          price: 0.000,
          yyyy: "",
          idUser: await AsyncStorage.getItem('idLG')
        },
        priceInt: 0,
      })
      console.log("in data: ", this.state.ItemSP );
      
      // this.getDate();
    }
    // add spending
    _addSpending = async() => {
      try {
        const data = await this.state.ItemSP;
        await fetch('http://192.168.1.8:3000/api/addSpending',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'data': data,
            'priceInt': this.state.priceInt
          })
        }).then((response)=>response.json())
        .then((res)=>{
          if(res.status===1){
            this._handleRefreshing();
          } else{
            console.log ("log info add spending error  ", res)
          }
        })
        .done();
      } catch (error) {
        this.setState({refreshing: false});
        console.log("Login client fail ", error);
      }
    }

    // update spending
    _updateSpending = async() => {
      try {
        const data = await this.state.ItemSP;
        console.log("./LG...............................", data.id + "/"+ data.name)
        await fetch('http://192.168.1.8:3000/api/updateSpending',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'data': data,
            'priceInt': this.state.priceInt
          })
        }).then((response)=>response.json())
        .then((res)=>{
          if(res.status===1){
            this._handleRefreshing();
          } else{
            console.log ("log info update spending error  ", res)
          }
        })
        .done();
      } catch (error) {
        this.setState({refreshing: false});
        console.log("Login client fail ", error);
      }
    }

    //điều hướng thêm / cập nhật spending
    _handleRedirectAdd_Update = async() => {
      if(this.state.ItemSP.name == "") {
        this.setState({mess: "1"})
      } else {
        if(this.state.ItemSP.price == 0) {
          this.setState({mess: "2"})
        } else {

          let id = await this.state.ItemSP.id;
          if(id != null) {
            console.log("update");
            this._updateSpending();
          } else {
            console.log("add");
            this._addSpending();
          }

        }
      }
    }

    //delete spending
    _delSpending = async() => {
      try {
        const id = await this.state.ItemSP.id;
        await fetch('http://192.168.1.8:3000/api/delSpending',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'id': id
          })
        }).then((response)=>response.json())
        .then((res)=>{
          if(res.status===1){
            this._handleRefreshing();
          } else{
            console.log ("log info update spending error  ", res)
          }
        })
        .done();
      } catch (error) {
        this.setState({refreshing: false});
        console.log("Login client fail ", error);
      }
    }

    _filterDataSpending = (id) => {
      let objFilterC = this.state.kCategory;
      let kCategoryCount = 0;
      if(objFilterC[id].status) {
        objFilterC[id].status = false;
      } else {
        objFilterC[id].status = true;
      }
      objFilterC.forEach(element => {
        
        if(element.status) {
          kCategoryCount +=1;
        }
      });
      this.setState({kCategoryCount: kCategoryCount})
      this.setState({kCategory: objFilterC})
    }

    _selectCAll = () => {
      let objFilterC = this.state.kCategory;
      if(this.state.kCategoryCount == 10) {
        objFilterC.forEach(element => {
          element.status = false;
        });
        this.setState({kCategoryCount: 0})
      } else {
        objFilterC.forEach(element => {
          element.status = true;
        });
        this.setState({kCategoryCount: 10})
      }
      this.setState({kCategory: objFilterC})
    }

    _selectCAll2 = () => {
      let objFilterC = this.state.kCategory;
      objFilterC.forEach(element => {
        element.status = true;
      });
      this.setState({kCategoryCount: 10})
      this.setState({kCategory: objFilterC})
    }

    _renderDataSpending = async() => {
      try {
        const listC=[];
        if(this.state.kCategoryCount!=10){
          let objFilterC = this.state.kCategory;
          objFilterC.forEach(element => {
            if(element.status) {
              listC.push(element.name);
            }
          });
        }
        console.log(listC);

        const idLG = await AsyncStorage.getItem('idLG');
        // console.log("./LG...............................", idLG)
        await fetch('http://192.168.1.8:3000/api/getALLSpending',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'id': idLG,
            'listC': listC
          })
        }).then((response)=>response.json())
        .then((res)=>{
          this.setState({refreshing: false});
          if(res.status===1){
            let data = res.body.data;
            this.setState({count: res.count})
            this.setState({spendingSV: data})
          } else{
            console.log ("log info get all spending error  ", res)
          }
        })
        .done();
      } catch (error) {
        this.setState({refreshing: false});
        console.log("Login client fail ", error);
      }
    }
    
    //reder data
    _refreshDataSpending = () => {
      this._renderDataSpending();
    }

    // refres data
    _handleRefreshing = () => {
      this.setState ({
        visibleModal: null,
        refreshing: true,
        mess: ""
      },
      () => {this._renderDataSpending()}
      )}
    
    getDate = () => {
      var date = new Date();
      this._handleConfirm(date);
    };

    _showDatePicker = () => {
      this.setState({ datePickerVisible: true });
    };
  
    _hideDatePicker = () => {
      this.setState({ datePickerVisible: false });
    };
    
    _handleConfirm = (date) => {
      let dayth = this._getDay(date.getDay());
      const formattedDate = dayth + " " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      this.setState({date: formattedDate});
      
      this.updateObject("datec", date.getFullYear() +"-"+ (date.getMonth() + 1) +"-"+ date.getDate());
      this.updateObject("day", ""+dayth);
      this.updateObject("dd", ""+date.getDate());
      this.updateObject("mm", ""+(date.getMonth() + 1));
      this.updateObject("yyyy", ""+date.getFullYear());
      
      this._hideDatePicker();
    };

    // render thứ
    _getDay = (day) => {
      switch(day) {
  
        case 0:
          return "Chủ nhật"
        
        case 1:
          return "Thứ hai"
  
        case 2:
          return "Thứ ba"
  
        case 3:
          return "Thứ tư"
  
        case 4:
          return "Thứ năm"
        
        case 5:
          return "Thứ sáu"
  
        case 6:
          return "Thứ bảy"

        default:
          Alert.alert("NUMBER NOT FOUND. day error Opps!");
      }
    }

    // tạo kiểu int sang tiền tệ
    _convertMoney = (price) => {
      let formattedPrice = Number(price).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      this.updateObject("price", formattedPrice);
    }

    //tạo kiểu tiền tệ sang int
    _convertNumber = (price) => {
      let intMoney = price.replace(/\./g,'').slice(0, -3);
      this.setState({priceInt: intMoney});
      console.log("price int ", this.state.priceInt);
    }
    
    //form common, modal 
    _renderFormInOut = () => {
      if ( this.state.ItemSP.pay === false) {
        return (
          <View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Tên khoản chi
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nhập tên khoản chi"
                autoCapitalize = "none"
                value = {this.state.ItemSP.name}
                 onChangeText = {(value) => {this.updateObject("name", value)}}
                />
              </View> 
              <Text style = {{justifyContent: "center", paddingTop: 8, color: 'red', display: this.state.mess=="1"?"flex":"none"}}>Tên không được để trống!</Text>
            </View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Loại khoản chi
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <Picker 
                  style={{height: 40 }}
                  itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                  selectedValue={this.state.ItemSP.category}
                  onValueChange={(value) => {this.updateObject("category", value)}}
                >
                  <Picker.Item label="Khoản chi khác" value="Khoản chi khác" />
                  <Picker.Item label="Sinh hoạt" value="Sinh hoạt" />
                  <Picker.Item label="Học tập" value="Học tập" />  
                  <Picker.Item label="Y tế" value="Y tế" />
                  <Picker.Item label="Giải trí" value="Giải trí" />
                  <Picker.Item label="Mua sắm" value="Mua sắm" />
                </Picker>
              </View> 
            </View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Ngày chi
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={this._showDatePicker}>
                      <Text style = {{height: 40, padding: 10}}>{this.state.ItemSP.yyyy===""?this.state.date : this.state.ItemSP.day+" "+this.state.ItemSP.dd+"/"+this.state.ItemSP.mm+"/"+this.state.ItemSP.yyyy}</Text>
                    </TouchableHighlight>

                  <DateTimePicker
                    isVisible={this.state.datePickerVisible}
                    onConfirm={this._handleConfirm}
                    onCancel={this._hideDatePicker}
                  />
              </View> 
            </View>
            
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Số tiền đã chi trả
                <Text style= {{color: "red"}}> *</Text>
                <Text style= {{color: this.state.ItemSP.pay === true ? "green": "red" , fontWeight: "bold"}}>{this.state.ItemSP===""?"":this.state.ItemSP.price} VND</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nhập số tiền đã chi trả"
                autoCapitalize = "none"
                keyboardType="numeric"
                defaultValue = {this.state.priceInt}
                onChangeText={(price) => { this.setState({priceInt: price}); this._convertMoney(price) }}
                />
              </View> 
              <Text style = {{justifyContent: "center", paddingTop: 8, color: 'red', display: this.state.mess=="2"?"flex":"none"}}>Số tiền không được để trống!</Text>
            </View>

            <View style = {{padding: 10, flexDirection: "row", justifyContent: "flex-end"}}>
              
              <View style= {{paddingLeft: 20, display: this.state.ItemSP.id != null? "flex": "none"}}>
                <Button
                  onPress={() => {this.setState({ visibleModal: 2 })}}
                  title= " Xóa khoản "
                  color="#bd3737"
                />
              </View>

              <View style= {{paddingLeft: 20}}>
                <Button
                  onPress={() => {this._handleRedirectAdd_Update();}}
                  title= " Lưu khoản "
                  color="#e7b62c"
                />
              </View>
              
              <View style= {{paddingLeft: 20}}>
                <Button
                  onPress={() => {this._handleRefreshing()}}
                  title= " Cancel "
                  color="#dadde1"
                />
              </View>
              
            </View>
          </View>
        )
      } else {
        return (
          <View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Tên khoản thu
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nhập tên khoản thu"
                autoCapitalize = "none"
                value = {this.state.ItemSP.name}
                 onChangeText = {(value) => {this.updateObject("name", value)}}
                />
              </View> 
              <Text style = {{justifyContent: "center", paddingTop: 8, color: 'red', display: this.state.mess=="1"?"flex":"none"}}>Tên không được để trống!</Text>
            </View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Loại khoản thu
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <Picker 
                  style={{height: 40 }}
                  itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                  selectedValue={this.state.ItemSP.category}
                  onValueChange={(value) => {this.updateObject("category", value)}}
                >
                  <Picker.Item label="Khoản thu khác" value="Khoản thu khác" />
                  <Picker.Item label="Nhận lương" value="Nhận lương" />
                  <Picker.Item label="Tiền thưởng" value="Tiền thưởng" />
                  <Picker.Item label="Lãi ngân hàng" value="Lãi ngân hàng" />
                </Picker>
              </View> 
            </View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text>Ngày thu
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={this._showDatePicker}>
                      <Text style = {{height: 40, padding: 10}}>{this.state.ItemSP.yyyy===""?this.state.date : this.state.ItemSP.day+" "+this.state.ItemSP.dd+"/"+this.state.ItemSP.mm+"/"+this.state.ItemSP.yyyy}</Text>
                    </TouchableHighlight>

                  <DateTimePicker
                    isVisible={this.state.datePickerVisible}
                    onConfirm={this._handleConfirm}
                    onCancel={this._hideDatePicker}
                  />
              </View> 
            </View>
            
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Số tiền đã thu
                <Text style= {{color: "red"}}> *</Text>
                <Text style= {{color: "green", fontWeight: "bold"}}>{this.state.ItemSP===""?"":this.state.ItemSP.price} VND</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nhập số tiền đã thu"
                autoCapitalize = "none"
                keyboardType="numeric"
                defaultValue = {this.state.priceInt}
                onChangeText={(price) => { this.setState({priceInt: price}); this._convertMoney(price) }}
                />
              </View> 
              <Text style = {{justifyContent: "center", paddingTop: 8, color: 'red', display: this.state.mess=="2"?"flex":"none"}}>Số tiền không được để trống!</Text>
            </View>
            
            <View style = {{padding: 10, flexDirection: "row", justifyContent: "flex-end"}}>
              <View style= {{paddingLeft: 20, display: this.state.ItemSP.id != null? "flex": "none"}}>
                <Button
                  onPress={() => {this.setState({ visibleModal: 2 })}}
                  title= " Xóa khoản "
                  color="#bd3737"
                />
              </View>
              <View style= {{paddingLeft: 20}}>
                <Button
                  onPress={() => {this._handleRedirectAdd_Update();}}
                  title= " Lưu khoản "
                  color="#e7b62c"
                />
              </View>
              <View style= {{paddingLeft: 20}}>
                <Button
                  onPress={() => {this._handleRefreshing()}}
                  title= " Cancel "
                  color="#dadde1"
                />
              </View>
              
            </View>
          </View>
        )
      }
    }
    //modal category
    _renderModalCategory = () => (
      <View style={{backgroundColor: "#fff", borderRadius: 5, color: "#000"}}>
        <View style= {{backgroundColor: "#fff3d0", borderTopStartRadius: 5, borderTopEndRadius: 5, padding: 10, flexDirection: "row"}}>
          <Text style= {{fontSize: 20, textTransform: "capitalize", color: "#000", fontWeight: "600", flex: 1}}>Lọc theo danh mục</Text>
        </View>

        <View style = {{padding: 10, flexDirection: "column", fontSize: 16}}>
          <View style= {{flexDirection: "row"}}>
            <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => {this._selectCAll()}}
            style= {{display: "flex", flexWrap: "wrap-reverse"}}
            >
              <View style = {{padding: 5, flexDirection: "row", borderRadius: 20, backgroundColor: this.state.kCategoryCount==10?"#e7b62c":"#cecece", marginLeft: 10, marginBottom: 10}}>
                <View style = {{
                      marginTop: 2
                    }}>
                </View>
                <Text style = {{fontSize: 17, fontWeight: "bold"}}> {this.state.kCategoryCount==10?"Hủy chọn tất cả" : "Chọn "+this.state.kCategoryCount+", Chọn tất cả"} </Text>
              </View>
            </TouchableHighlight>
          </View>
          <FlatList
            data= {this.state.kCategory}
            scrollEnabled={false}
            contentContainerStyle={{
              alignSelf: 'flex-start',
              flexDirection:'row', flexWrap:'wrap'
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}

            renderItem={this._renderListCategory}
            keyExtractor={item => `${item.id}`}
            refreshing={this.state.refreshing}
            onRefresh= {this._handleRefreshing}
          />
        </View>
        <View style = {{padding: 10, flexDirection: "row", justifyContent: "flex-end"}}>
          <View style= {{paddingLeft: 20}}>
            <Button
              onPress={() => {this._handleRefreshing()}}
              title= " Lọc "
              color="#e7b62c"
            />
          </View>
          <View style= {{paddingLeft: 20}}>
            <Button
              onPress={() => {this.setState({visibleModal: null}) ; this._selectCAll2();}}
              title= " Hủy lọc "
              color="#dadde1"
            />
          </View>
        </View>
      </View>
    );

    _renderListCategory = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => {this._filterDataSpending(item.id)}}
      style= {{display: "flex", flexWrap: "wrap-reverse"}}
      >
        <View style = {{padding: 5, flexDirection: "row", borderRadius: 20, backgroundColor: item.status==true?"#e7b62c":"#cecece", marginLeft: 10, marginBottom: 10}}>
          <View style = {{
                marginTop: 2
              }}>
          </View>
          <Text style = {{fontSize: 17}}> {item.name}</Text>
        </View>
      </TouchableHighlight>
    );

    //modal xóa
    _renderModaldel = () => (
      <View style={{backgroundColor: "#fff", borderRadius: 5, color: "#000"}}>
        <View style= {{backgroundColor: "#fff3d0", borderTopStartRadius: 5, borderTopEndRadius: 5, padding: 10}}>
          <Text style= {{fontSize: 20, textTransform: "capitalize", color: "#000", fontWeight: "600"}}>Xác nhận xóa khoản thu chi #{this.state.ItemSP.id} ?</Text>
        </View>

        <View style = {{padding: 10, flexDirection: "column"}}>
          <Text style = {{justifyContent: "center", paddingTop: 8, color: 'red', fontSize: 18}}>Sau khi xóa thông tin này sẽ không được phục hồi lại.</Text>
        </View>

        <View style = {{padding: 10, flexDirection: "row", justifyContent: "flex-end"}}>
          <View style= {{paddingLeft: 20, display: this.state.ItemSP.id != null? "flex": "none"}}>
            <Button
              onPress={() => {this._delSpending()}}
              title= " Đồng ý xóa "
              color="#bd3737"
            />
          </View>
          <View style= {{paddingLeft: 20}}>
            <Button
              onPress={() => {this._handleRefreshing()}}
              title= " Cancel "
              color="#dadde1"
            />
          </View>
        </View>
      </View>
    );

    //modal sửa
    _renderModalEdit = () => (
      <View style={{backgroundColor: "#fff", borderRadius: 5, color: "#000"}}>
        <View style= {{backgroundColor: "#fff3d0", borderTopStartRadius: 5, borderTopEndRadius: 5, padding: 10}}>
          <Text style= {{fontSize: 20, textTransform: "capitalize", color: "#000", fontWeight: "600"}}>{this.state.ItemSP.id != null? "Cập nhật khoản thu chi #"+this.state.ItemSP.id:"Thêm khoản thu chi"}</Text>
        </View>

        <View style = {{padding: 10, flexDirection: "column"}}>
          <View style= {{flexDirection: "row"}}>
            <RadioButton
              status={ this.state.ItemSP.pay === false ? 'checked' : 'unchecked' }
              onPress={() => {this.updateObject("pay", false);}}
            />
            <Text style = {{justifyContent: "center", paddingTop: 8, color: this.state.ItemSP.pay === false ? 'green': '#000', fontWeight: "bold"}}>Nhập khoản chi</Text>
          </View>
          <View style= {{flexDirection: "row"}}>
              <RadioButton
                status={ this.state.ItemSP.pay === true ? 'checked' : 'unchecked' }
                onPress={() => {this.updateObject("pay", true);}}
              />
            <Text style = {{justifyContent: "center", paddingTop: 8, color: this.state.ItemSP.pay === true ? 'green': '#000', fontWeight: "bold"}}>Nhập khoản thu</Text>
          </View>  
        </View>

        {/* render from */}
        {this._renderFormInOut()}
        
      </View>
    );

    //in danh sách spending ra màn hình
    _renderSpending = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => {this.setState({ visibleModal: 1, ItemSP: item}); this._convertNumber(item.price)}}>
        <View style={styles.spendingItemContainer}>
          <View style = {{flexDirection:'row', paddingTop: 10}}>
            <View>
              <View style = {{backgroundColor: "#e7b62c8c", height: 55, width: 50, borderRadius: 10}}>
                <Text style= {{color: "#ff6a00",  flex: 1,textAlign: 'center', padding: 13, fontSize: 20}}>{item.dd}</Text>
              </View>
            </View>
            <View style = {{paddingLeft: 10}}>
              <Text style = {{fontWeight: "bold", paddingBottom: 10}}>{item.day}</Text>
              <Text>Tháng {item.mm} {item.yyyy}</Text>
            </View>
          </View>
          <View style = {{flex: 1, flexDirection:'row',}}>
            <Text style={styles.spendingName}>{item.name}</Text>
              <Text style={styles.spendingPrice}><Text style={{color:item.pay===false?'#000':'green'}}>{item.pay===false?'-':'+'}{item.price}VND</Text></Text>
          </View>
          <Text style={styles.spendingInfo}><Image style={{height: 25, width: 25}} source={require("../../../assets/icons/pin-icon.png")} />{item.category}</Text>
        </View>
      </TouchableHighlight>
    );

    // hàm render chính
    render() {
        return (
          <View style={styles.spendingContainer}>
            <View style = {{width: "95%", margin: 10}}>
                <Searchbar
                    placeholder="Search"
                />
            </View>
            {/* //conten page */}
            <View style = {{width: "100%", paddingBottom: 10}}>
                <View style={styles.spendingFilterContainer}>
                    <View style = {{flex: 1, flexDirection:'row',}}>
                        <Text style={styles.spendingFilterTxt}>Lọc theo</Text>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
                            <View style= {{backgroundColor: "#fff", flex: 1, justifyContent: "center", paddingLeft: 10, paddingRight: 10, borderRadius: 20, borderColor: "#e7b62c", borderWidth: 3, alignItems: "center", marginRight: 10}}>
                                <Text style = {{color: "#e7b62c", fontWeight: "bold"}}>1 tháng gần nhất</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => {this.setState({visibleModal: 3})}}>
                            <View style= {{backgroundColor: "#fff", flex: 1, justifyContent: "center", paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderRadius: 20, borderColor: "#E7E9EB", borderWidth: 3}}>
                                <Text style = {{color: "#e7b62c", fontWeight: "bold"}}><Image style={{height: 25, width: 25}} source={require("../../../assets/icons/pin-icon.png")} /> Danh mục</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={styles.spendingTotalContainer}>
                    <View style = {{flex: 1, flexDirection:'row',}}>
                        <Text style={styles.spendingTotalTxt}>{this.state.count} giao dịch</Text>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this._newSpending()}>
                            <View style= {{backgroundColor: "#e7b62c", flex: 1, justifyContent: "center", paddingLeft: 10, paddingRight: 10, paddingBottom: 15, paddingTop: 10, borderRadius: 10, borderColor: "#E7E9EB", borderWidth: 1}}>
                                <Text style = {{color: "#fff", fontWeight: "bold"}}><Image style={{height: 20, width: 20}} source={require("../../../assets/icons/add-icon.png")} /> Thêm chi tiêu</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <FlatList
                    data= {this.state.spendingSV}
                    renderItem={this._renderSpending}
                    keyExtractor={item => `${item.id}`}
                    refreshing={this.state.refreshing}
                    onRefresh= {this._handleRefreshing}
                />
            </View>

            {/* Modal edit*/}
            <Modal isVisible={this.state.visibleModal === 1}>
                {this._renderModalEdit()}
            </Modal>

            {/* Modal del*/}
            <Modal isVisible={this.state.visibleModal === 2}>
                {this._renderModaldel()}
            </Modal>

            {/* Modal category*/}
            <Modal isVisible={this.state.visibleModal === 3}>
                {this._renderModalCategory()}
            </Modal>

          </View>
        );
    }
}