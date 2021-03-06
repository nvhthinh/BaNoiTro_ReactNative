import React from "react";
import {View, Text, Image, FlatList, TouchableHighlight, Button, Picker, TextInput,AsyncStorage, ActivityIndicator, Dimensions } from "react-native";
import { Input, Icon} from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import stylesS from './stylesSummary';
import { spending } from '../../data/dataArrays';
import Modal from 'react-native-modal';
import DateTimePicker from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';

// import PeiChart from './peiChart';
import {PieChart,} from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

export default class SpendingSummary extends React.Component {
    
    state = {
      // visibleModal: 1,
      visibleModal: 0,
      choosenIndex: 0,
      datePickerVisible: false,
      spendingChartSV: [],
      spendingSumSV: [],
      date: "",
      price: "0,000",
      checked: "first",
      refreshing: true,
      // type: "WEEK"
      type: "MONTH"
    };
    
    componentDidMount() {
      // this.getDate();
      this._renderDataSpending();
    }
    
    _renderDataSpending = async() => {
      try {
        const idLG = await AsyncStorage.getItem('idLG');
        await fetch('http://192.168.1.8:3000/api/spendingSummary',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'id': idLG,
            'type': this.state.type
          })
        }).then((response)=>response.json())
        .then((res)=>{
        //   this.setState({refreshing: false});
          if(res.status===1){
            let spending = res.body.data;
            this.setState({spendingChartSV: spending, refreshing: false})
            this._handleSumSpending(spending);
          } else{
            this.setState({spendingChartSV: [], spendingSumSV: [], refreshing: false})
            console.log ("log info get all spending summary error  ", res)
          }
        })
        .done();
      } catch (error) {
        this.setState({refreshing: false});
        console.log("Login client fail ", error);
      }
    }

    //tính tổng spending
    _handleSumSpending = (array) => {
      let sI =0 ,sO =0, sS=0, sR=0, pI=0;
      array.forEach(e => {
        if(!e.pay) {
          sO+= Number((e.price_category).replace(/\./g,'').slice(0, -3));
        } else {
          sI+= Number((e.price_category).replace(/\./g,'').slice(0, -3));
          pI+= e.percent;
        }
      });
      sS = sI - sO;
      sR = sI - sO;
      pI = Math.round(pI);
      let pO = 100 - pI;

      const objSumSV = this.state.spendingSumSV;
      objSumSV.sO = Number(sO).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      objSumSV.sI = Number(sI).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      objSumSV.sS = Number(sS).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      objSumSV.sR = Number(sR).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');

      objSumSV.pO = pO;
      objSumSV.pI = pI;
      this.setState({spendingSumSV: objSumSV})
      // console.log("dong S ", this.state.spendingSumSV.sO);
    }

    //Lọc tuàn tháng
    _filter = (type) => {
      this.setState({type: type});
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
      const formattedDate = this._getDay(date.getDay()) + "/" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // console.warn("A date has been picked:Get thu ngày>>>>>>>>>>>", formattedDate);
      this.setState({date: formattedDate});
      this._hideDatePicker();
    };

    _getDay = (day) => {
      // console.log(day, "_________________");
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
    _setText = (price) => {
      let formattedPrice = Number(price).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      console.log ("______________>>>>>>>", formattedPrice);
      this.setState({price: formattedPrice});
    }
    _renderForm = () => {
      if (this.state.checked === 'first') {
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
                //  onChangeText = {this.handleEmail}
                />
              </View> 
            </View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Loại khoản chi
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <Picker 
                  style={{height: 40 }}
                  itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                  selectedValue={this.state.language}
                  onValueChange={(itemValue, itemPosition) =>
                    this.setState({language: itemValue, choosenIndex: itemPosition})}  
                >
                  <Picker.Item label="Đầu tư" value="Đầu tư" />  
                  <Picker.Item label="Gửi tiết tiết kiệm" value="Gửi tiết tiết kiệm" />  
                  <Picker.Item label="Mua sắm" value="Mua sắm" />  
                  <Picker.Item label="Sinh hoạt" value="Sinh hoạt" />  
                </Picker>
              </View> 
            </View>

            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Ngày chi
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={this._showDatePicker}>
                      <Text style = {{height: 40, padding: 10}}>{this.state.date}</Text>
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
                <Text style= {{color: "green", fontWeight: "bold"}}> {this.state.price} đ</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nhập số tiền đã chi trả"
                autoCapitalize = "none"
                keyboardType="numeric"
                onChangeText={price => this._setText(price)}
                />
              </View> 
            </View>
            
            <View style = {{padding: 10, flexDirection: "row", justifyContent: "flex-end"}}>
              <View style= {{paddingLeft: 20}}>
                <Button
                  onPress={() => this.setState({ visibleModal: null })}
                  title= " Lưu khoản chi "
                  color="#e7b62c"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
              <View style= {{paddingLeft: 20}}>
                <Button
                  onPress={() => this.setState({ visibleModal: null })}
                  title= " Cancel "
                  color="#dadde1"
                  accessibilityLabel="Learn more about this purple button"
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
                //  onChangeText = {this.handleEmail}
                />
              </View> 
            </View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Loại khoản thu
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <Picker 
                  style={{height: 40 }}
                  itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                  selectedValue={this.state.language}
                  onValueChange={(itemValue, itemPosition) =>
                    this.setState({language: itemValue, choosenIndex: itemPosition})}  
                >
                  <Picker.Item label="Lương" value="Đầu tư" />  
                  <Picker.Item label="Thu nhập khác" value="Mua sắm" />  
                </Picker>
              </View> 
            </View>

            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Ngày thu
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={this._showDatePicker}>
                      <Text style = {{height: 40, padding: 10}}>{this.state.date}</Text>
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
                <Text style= {{color: "green", fontWeight: "bold"}}> {this.state.price} đ</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nhập số tiền đã thu"
                autoCapitalize = "none"
                keyboardType="numeric"
                onChangeText={price => this._setText(price)}
                />
              </View> 
            </View>
            
            <View style = {{padding: 10, flexDirection: "row", justifyContent: "flex-end"}}>
              <View style= {{paddingLeft: 20}}>
                <Button
                // style={stylesS.fastSearchItemBt}
                  onPress={() => this.setState({ visibleModal: null })}
                  title= " Lưu khoản thu "
                  color="#e7b62c"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
              <View style= {{paddingLeft: 20}}>
                <Button
                  onPress={() => this.setState({ visibleModal: null })}
                  title= " Cancel "
                  color="#dadde1"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
              
            </View>
          </View>
        )
      }
    }
    _renderModalContent = () => (
        <View style={{backgroundColor: "#fff", borderRadius: 5, color: "#000"}}>
          <View style= {{backgroundColor: "#fff3d0", borderTopStartRadius: 5, borderTopEndRadius: 5, padding: 10}}>
            <Text style= {{fontSize: 20, textTransform: "capitalize", color: "#000", fontWeight: "600"}}>Thêm khoản chi tiêu</Text>
          </View>

          <View style = {{padding: 10, flexDirection: "column"}}>
            <View style= {{flexDirection: "row"}}>
              <RadioButton
                value="first"
                status={ this.state.checked === 'first' ? 'checked' : 'unchecked' }
                // onPress={() => setChecked('first')}
                onPress={() => this.setState({ checked: "first" })}
              />
              <Text style = {{justifyContent: "center", paddingTop: 8, color: this.state.checked === 'first' ? 'green': '#000', fontWeight: "bold"}}>Nhập khoản chi</Text>
            </View>
            <View style= {{flexDirection: "row"}}>
                <RadioButton
                  value="second"
                  status={ this.state.checked === 'second' ? 'checked' : 'unchecked' }
                  onPress={() => this.setState({ checked: "second" })}
                />
              <Text style = {{justifyContent: "center", paddingTop: 8, color: this.state.checked === 'second' ? 'green': '#000', fontWeight: "bold"}}>Nhập khoản thu</Text>
            </View>  
          </View>
          {this._renderForm(this.state.checked)}
        </View>
    );
    
    _renderTips = (item, sum) => {
      let componentTips  = [];
      if(sum.pI>=50) {
        if(sum.pI>65) {
          componentTips.push(
            <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                <View
                  style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                />
                <View style = {{flexDirection: "column"}}>
                  <Text>Chào bạn! Thống kê thu nhập trong đợt tốt, đạt {sum.sS}VND. Tổng lợi nhuận cao hơn 15%.</Text>
                  <Text>Tổng lời {parseInt(sum.pI)-parseInt(sum.pO)}%. với số tiền lợi nhuận {sum.sR}VND</Text>
                  <Text>Chúc mừng bạn, Tăng trưởng hơn nữa bằng một số gợi ý của chúng tôi về bạn.</Text>
                </View>
            </View>
          )
        } else {
          componentTips.push(
            <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
              <View
                style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
              />
              <View style = {{flexDirection: "column"}}>
                <Text>Chào bạn! Thống kê thu nhập đạt mức trung bình, đạt {sum.sS}VND. Lợi nhuận thấp hơn 15%</Text>
                <Text>Tổng lời {parseInt(sum.pI)-parseInt(sum.pO)}%. với số tiền lợi nhuận {sum.sR}VND</Text>
                <Text>Bạn cần cố gắng hơn, Tăng trưởng hơn bằng một số gợi ý của chúng tôi về bạn.</Text>
              </View>
          </View>
          )
        }
      } else {
        if(sum.pI>45) {
          componentTips.push(
            <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                <View
                  style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                />
                <View style = {{flexDirection: "column"}}>
                  <Text>Chào bạn! Thống kê thu nhập trong đợt chưa tốt.</Text>
                  <Text>Tổng thua lỗ {parseInt(sum.pI)-parseInt(sum.pO)}%. với số tiền {sum.sR}VND</Text>
                  <Text>Hãy cố lên, Lấy lại đà tăng trưởng bằng một số gợi ý của chúng tôi về bạn.</Text>
                </View>
            </View>
          )
        } else {
          componentTips.push(
            <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                <View
                  style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                />
                <View style = {{flexDirection: "column"}}>
                  <Text>Chào bạn! Thống kê thu nhập trong đợt rất tệ.</Text>
                  <Text>Tổng thua lỗ {parseInt(sum.pI)-parseInt(sum.pO)}%. với số tiền {sum.sR}VND</Text>
                  <Text>Hãy cố lên, Lấy lại đà tăng trưởng bằng một số gợi ý của chúng tôi về bạn.</Text>
                </View>
            </View>
          )
        }
      }
      // console.log(item)
      item.forEach(e => {
        if(sum.pI>=50) {
          if(e.pay) {
            switch(e.name) {
              case 'Khoản thu khác':
              if(e.percentInt>25){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Bạn có 1 công việc tay trái tốt, Hãy cố gắng phát huy nhé! {e.price_category}VND chiếm {e.percentInt}% khoản thu của bạn.</Text>
                </View>
                )
              }
              case 'Nhận lương':
              if(e.percentInt<=60){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Khoản thu nhập chính có vẻ không được tốt. Cố lên nào!</Text>
                </View>
                )
              }
        
              case 'Tiền thưởng':
              if(e.percentInt>10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Trong đợt này cố gắng xuất sắc công việc của mình và được khoản thưởng lớn. Hảy tự thưởng cho bản thân gì đi nào!</Text>
                </View>
                )
              }
            }

          } else {
            switch(e.name) {
              case 'Khoản chi khác':
              if(e.percentInt<5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Khoản chi không xác định vược quá 5% bạn nên chú ý để quản lý thu nhập tốt hơn.</Text>
                </View>
                )
              }
              // continue;
              case 'Sinh hoạt':
              if(e.percentInt>20 || e.percentInt<10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>20?"Với kinh tế hiện tại của bạn. Chúng tôi khuyên bạn nên giảm chi tiêu đến mức có thể từ "+e.percentInt+"% xuống 20% của tổng chi.": ""}
                    {e.percentInt<10?"Cùng với sự phát triển kinh tế bạn cũng nên chú trọng hơn đến việc chăm sóc gia đình nhé! "+e.percentInt+"% là mức sinh hoạt trong tổng số.": ""}
                    </Text>
                </View>
                )
              }
        
              case 'Học tập':
              if(e.percentInt>20 || e.percentInt<10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>20?"Học tập là đầu tư cho tương lai, nhưng hảy đầu tư hợp lý vào đúng mục đích nhé!":""}
                    {e.percentInt<10?"Học tập là đầu tư cho tương lai, dành một chút thời gian để quan tâm đến việc đầu tư cho tương lai các con nữa nhé!": ""}
                    </Text>
                </View>
                )
              }
        
              case 'Y tế':
              if(e.percentInt>=20 || e.percentInt<=10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>=20?"Có vẻ sức khỏe gia đình bạn không được tốt hảy chăm sóc bằng những món ăn phù hợp để cải thiện sức khỏe gia đình bạn nào":""}
                    {e.percentInt<=10?"Sức khỏe là quan trọng nhất. Hảy chú ý chăm sóc và nên khám sức khỏe cho gia đình nào.": ""}
                    </Text>
                </View>
                )
              } else {
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Ngoài cồng việc bạn cũng nên chú trong đến sức khỏe. Nhớ tham khảo các công thức nấu ăn tốt cho sức khỏe của chúng tôi nào</Text>
                </View>
                )
              }
              
              case 'Giải trí':
              if(e.percentInt>20 || e.percentInt<5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>=20?"Có vẻ gia đình đã trải qua 1 kì nghỉ vui vẻ và tốn kém. Hảy cùng chúng tôi phát triển kinh tế nhé!":""}
                    {e.percentInt<=5?"Sau một khoản thời gian làm việc mệt mỏi, hảy cùng gia đình tổ chức 1 buổi thăm quan hay vui vẻ gải trí cùng nhau nào.": ""}
                    </Text>
                </View>
                )
              }

              case 'Mua sắm':
              if(e.percentInt>10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Nên mua những gì cần thiết thôi nào.</Text>
                </View>
                )
              }
            }
          }
        } else {
          ///<50%
          if(e.pay) {
            switch(e.name) {
              case 'Khoản thu khác':
              if(e.percentInt>30){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Bạn có 1 công việc tay trái tốt, Hảy cố gắng phát huy nhé! {e.price_category}VND chiếm {e.percentInt}% khoản thu của bạn.</Text>
                </View>
                )
              }
              case 'Nhận lương':
              if(e.percentInt<=70){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Khoản thu nhập chính có vẻ không được tốt. Cố lên nào!</Text>
                </View>
                )
              }
        
              case 'Tiền thưởng':
              if(e.percentInt>20){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Trong đợt này cố gắng xuất sắc công việc của mình và được khoản thưởng lớn. Hảy tự thưởng cho bản thân gì đi nào!</Text>
                </View>
                )
              }
            }

          } else {
            switch(e.name) {
              case 'Khoản chi khác':
              if(e.percentInt<2){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Khoản chi không xác định vược quá 5% bạn nên chú ý để quản lý thu nhập tốt hơn.</Text>
                </View>
                )
              }
              // continue;
              case 'Sinh hoạt':
              if(e.percentInt>10 || e.percentInt<5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>10?"Với kinh tế hiện tại của bạn. Chúng tôi khuyên bạn nên giảm chi tiêu đến mức có thể từ "+e.percentInt+"% xuống 20% của tổng chi.": ""}
                    {e.percentInt<5?"Cùng với sự phát triển kinh tế bạn cũng nên chú trọng hơn đến việc chăm sóc gia đình nhé! "+e.percentInt+"% là mức sinh hoạt trong tổng số.": ""}
                    </Text>
                </View>
                )
              }
        
              case 'Học tập':
              if(e.percentInt>10 || e.percentInt<5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>10?"Học tập là đầu tư cho tương lai, nhưng hảy đầu tư hợp lý vào đúng mục đích nhé!":""}
                    {e.percentInt<5?"Học tập là đầu tư cho tương lai, dành một chút thời gian để quan tâm đến việc đầu tư cho tương lai các con nữa nhé!": ""}
                    </Text>
                </View>
                )
              }
        
              case 'Y tế':
              if(e.percentInt>=10 || e.percentInt<=5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>=10?"Có khỏe sức khỏe gia đình bạn không được tốt hảy chăm sóc bằng những món ăn phù hợp để cải thiện sức khỏe gia đình bạn nào":""}
                    {e.percentInt<=5?"Sức khỏe là quan trọng nhất. Hảy chú ý chăm sóc và nên khám sức khỏe cho gia đình nào.": ""}
                    </Text>
                </View>
                )
              }
              
              case 'Giải trí':
              if(e.percentInt>5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Trong thời gian khó khăn này. Mục giải trí nên hạn chế nhé</Text>
                </View>
                )
              }

              case 'Mua sắm':
              if(e.percentInt>5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Nên mua những gì cần thiết thôi nào.</Text>
                </View>
                )
              }
            }
          }
        }
      });

      return (componentTips);
    }


    renderCategory = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
        <View style={stylesS.spendingItemContainer}>
          <View style = {{margin: 8, backgroundColor: "#fff", borderRadius: 3, padding: 5, borderLeftColor: item.color, borderLeftWidth: 5}}>
            <View style = {{flexDirection:'row', paddingTop: 10}}>
                <Text>{item.name} ({item.percentInt})%</Text>
            </View>
            <View style = {{flexDirection:'row', paddingTop: 10}}>
                <Text style = {{color: item.pay== true? "green": "red"}}>{item.pay==true?"+" : "-"} {item.price_category} VND</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
    render() {
        if( this.state.refreshing ) {
        return (
            <View style={{flex: 1,justifyContent: "center" }}>
              <ActivityIndicator size="large" color="#e7b62c"/>
            </View>
          )
        }
        return (
          <View style={stylesS.spendingContainer}>
            {/* //conten page */}
            <View style = {{width: "100%"}}>
                <View style={stylesS.spendingFilterContainer}>
                    <View style = {{flex: 1, flexDirection:'row',justifyContent: "center"}}>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this._filter("WEEK")}>
                          <View style= {{backgroundColor: "#fff", flex: 1, justifyContent: "center", padding: 8, borderRadius: 20, borderColor: this.state.type=="WEEK"?"#e7b62c":"#E7E9EB", borderWidth: 3, alignItems: "center", marginRight: 10, minWidth: 110}}>
                              <Text style = {{color: "#e7b62c", fontWeight: "bold"}}>7 ngày</Text>
                          </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this._filter("MONTH")}>
                          <View style= {{backgroundColor: "#fff", flex: 1, justifyContent: "center", padding: 8, borderRadius: 20, borderColor: this.state.type=="MONTH"?"#e7b62c":"#E7E9EB", borderWidth: 3, alignItems: "center", marginRight: 10, minWidth: 110}}>
                            <Text style = {{color: "#e7b62c", fontWeight: "bold"}}>1 tháng</Text>
                          </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this._filter("3M")}>
                          <View style= {{backgroundColor: "#fff", flex: 1, justifyContent: "center", padding: 8, borderRadius: 20, borderColor: this.state.type=="3M"?"#e7b62c":"#E7E9EB", borderWidth: 3, alignItems: "center", marginRight: 10, minWidth: 110}}>
                              <Text style = {{color: "#e7b62c", fontWeight: "bold"}}>3 tháng</Text>
                          </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={stylesS.spendingPeiContainer}>
                  
                  {/* <PeiChart/> */}
                  <View style= {{flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <PieChart
                      // data={summarySpending}
                      data= {this.state.spendingChartSV}
                      
                      width={Dimensions.get('window').width - 16}
                      height={280}
                      chartConfig={{
                      backgroundColor: '#1cc910',
                      backgroundGradientFrom: '#eff3ff',
                      backgroundGradientTo: '#efefef',
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                          borderRadius: 16,
                      },
                      }}
                      style={{
                      marginVertical: 8,
                      borderRadius: 16,
                      }}
                      accessor="percent"
                      backgroundColor="transparent"
                      // paddingLeft="0"
                      center={[screenWidth/4, 0]}
                      absolute //for the absolute number remove if you want percentage
                      hasLegend={false}
                  />
                </View>
                  {/* // */}
                </View>
                {/* item */}
                <FlatList
                    vertical
                    numColumns={2}
                    data={this.state.spendingChartSV}
                    renderItem={this.renderCategory}
                    keyExtractor={item => `${item.id}`}
                    refreshing={this.state.refreshing}
                    onRefresh= {this._handleRefreshing}
                />
                {/* total */}
               

              <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
                <View style={{flex: 1,}}>
                  <View style = {{margin: 8, backgroundColor: "#fff", borderRadius: 3, padding: 5, borderLeftColor: "#e7b62c", borderLeftWidth: 5, paddingLeft: 10}}>
                    
                    <View style = {{flexDirection:'row', paddingTop: 10}}>
                        <Text style= {{color: "red"}}>Tổng số tiền chi: -{this.state.spendingSumSV.sO} VND </Text> 
                        <Text>({this.state.spendingSumSV.pO})%</Text>
                    </View>
                    <View style = {{flexDirection:'row', paddingTop: 10}}>
                        
                        <Text style= {{color:"green"}}>Tổng số tiền thu: {this.state.spendingSumSV.sI} VND </Text>
                        <Text>({this.state.spendingSumSV.pI})%</Text>
                    </View>

                    <View style = {{flexDirection:'row', paddingTop: 10}}>
                        <Text style ={{fontWeight: "bold", fontSize: 18}}>Tổng số tiền còn lại:{this.state.spendingSumSV.sS} VND </Text>
                    </View>

                  </View>
                </View>
              </TouchableHighlight>
              {/* //tips */}
              <View style= {{backgroundColor: "#fff", borderRadius: 5, padding: 20}}>
                  <View style = {{flexDirection: "row", paddingBottom: 10}}>
                    <Image
                      style={{height: 30, width: 30}}
                      source={require('./../../../assets/icons/heart.png')}
                    />
                      <Text style= {{fontSize: 20, borderBottomColor: "#e7b62c", borderBottomWidth: 3}}>Lời khuyên cho bạn</Text>
                  </View>
                  <View style={{display: this.state.spendingSumSV.sS == null?"none":"flex"}}>
                    {this._renderTips(this.state.spendingChartSV, this.state.spendingSumSV)}
                  </View>
              </View>
              
            </View>

            {/* Modal */}
            <Modal isVisible={this.state.visibleModal === 1}>
                {this._renderModalContent()}
            </Modal>
          </View>
        );
    }
}