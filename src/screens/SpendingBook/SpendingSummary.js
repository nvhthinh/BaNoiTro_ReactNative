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

    //t??nh t???ng spending
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

    //L???c tu??n th??ng
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
      // console.warn("A date has been picked:Get thu ng??y>>>>>>>>>>>", formattedDate);
      this.setState({date: formattedDate});
      this._hideDatePicker();
    };

    _getDay = (day) => {
      // console.log(day, "_________________");
      switch(day) {
  
        case 0:
          return "Ch??? nh???t"
        
        case 1:
          return "Th??? hai"
  
        case 2:
          return "Th??? ba"
  
        case 3:
          return "Th??? t??"
  
        case 4:
          return "Th??? n??m"
        
        case 5:
          return "Th??? s??u"
  
        case 6:
          return "Th??? b???y"

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
              <Text style={{}}>T??n kho???n chi
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nh???p t??n kho???n chi"
                autoCapitalize = "none"
                //  onChangeText = {this.handleEmail}
                />
              </View> 
            </View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Lo???i kho???n chi
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
                  <Picker.Item label="?????u t??" value="?????u t??" />  
                  <Picker.Item label="G???i ti???t ti???t ki???m" value="G???i ti???t ti???t ki???m" />  
                  <Picker.Item label="Mua s???m" value="Mua s???m" />  
                  <Picker.Item label="Sinh ho???t" value="Sinh ho???t" />  
                </Picker>
              </View> 
            </View>

            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Ng??y chi
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
              <Text style={{}}>S??? ti???n ???? chi tr???
                <Text style= {{color: "red"}}> *</Text>
                <Text style= {{color: "green", fontWeight: "bold"}}> {this.state.price} ??</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nh???p s??? ti???n ???? chi tr???"
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
                  title= " L??u kho???n chi "
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
              <Text style={{}}>T??n kho???n thu
                <Text style= {{color: "red"}}> *</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nh???p t??n kho???n thu"
                autoCapitalize = "none"
                //  onChangeText = {this.handleEmail}
                />
              </View> 
            </View>
            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Lo???i kho???n thu
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
                  <Picker.Item label="L????ng" value="?????u t??" />  
                  <Picker.Item label="Thu nh???p kh??c" value="Mua s???m" />  
                </Picker>
              </View> 
            </View>

            <View style = {{padding: 10, flexDirection: "column"}}>
              <Text style={{}}>Ng??y thu
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
              <Text style={{}}>S??? ti???n ???? thu
                <Text style= {{color: "red"}}> *</Text>
                <Text style= {{color: "green", fontWeight: "bold"}}> {this.state.price} ??</Text>
              </Text>
              <View style={{borderColor: "#dadde1", borderWidth: 1, borderRadius: 5}}>
                <TextInput 
                style={{height: 40, paddingLeft: 10}}
                underlineColorAndroid = "transparent"
                placeholder = "Nh???p s??? ti???n ???? thu"
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
                  title= " L??u kho???n thu "
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
            <Text style= {{fontSize: 20, textTransform: "capitalize", color: "#000", fontWeight: "600"}}>Th??m kho???n chi ti??u</Text>
          </View>

          <View style = {{padding: 10, flexDirection: "column"}}>
            <View style= {{flexDirection: "row"}}>
              <RadioButton
                value="first"
                status={ this.state.checked === 'first' ? 'checked' : 'unchecked' }
                // onPress={() => setChecked('first')}
                onPress={() => this.setState({ checked: "first" })}
              />
              <Text style = {{justifyContent: "center", paddingTop: 8, color: this.state.checked === 'first' ? 'green': '#000', fontWeight: "bold"}}>Nh???p kho???n chi</Text>
            </View>
            <View style= {{flexDirection: "row"}}>
                <RadioButton
                  value="second"
                  status={ this.state.checked === 'second' ? 'checked' : 'unchecked' }
                  onPress={() => this.setState({ checked: "second" })}
                />
              <Text style = {{justifyContent: "center", paddingTop: 8, color: this.state.checked === 'second' ? 'green': '#000', fontWeight: "bold"}}>Nh???p kho???n thu</Text>
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
                  <Text>Ch??o b???n! Th???ng k?? thu nh???p trong ?????t t???t, ?????t {sum.sS}VND. T???ng l???i nhu???n cao h??n 15%.</Text>
                  <Text>T???ng l???i {parseInt(sum.pI)-parseInt(sum.pO)}%. v???i s??? ti???n l???i nhu???n {sum.sR}VND</Text>
                  <Text>Ch??c m???ng b???n, T??ng tr?????ng h??n n???a b???ng m???t s??? g???i ?? c???a ch??ng t??i v??? b???n.</Text>
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
                <Text>Ch??o b???n! Th???ng k?? thu nh???p ?????t m???c trung b??nh, ?????t {sum.sS}VND. L???i nhu???n th???p h??n 15%</Text>
                <Text>T???ng l???i {parseInt(sum.pI)-parseInt(sum.pO)}%. v???i s??? ti???n l???i nhu???n {sum.sR}VND</Text>
                <Text>B???n c???n c??? g???ng h??n, T??ng tr?????ng h??n b???ng m???t s??? g???i ?? c???a ch??ng t??i v??? b???n.</Text>
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
                  <Text>Ch??o b???n! Th???ng k?? thu nh???p trong ?????t ch??a t???t.</Text>
                  <Text>T???ng thua l??? {parseInt(sum.pI)-parseInt(sum.pO)}%. v???i s??? ti???n {sum.sR}VND</Text>
                  <Text>H??y c??? l??n, L???y l???i ???? t??ng tr?????ng b???ng m???t s??? g???i ?? c???a ch??ng t??i v??? b???n.</Text>
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
                  <Text>Ch??o b???n! Th???ng k?? thu nh???p trong ?????t r???t t???.</Text>
                  <Text>T???ng thua l??? {parseInt(sum.pI)-parseInt(sum.pO)}%. v???i s??? ti???n {sum.sR}VND</Text>
                  <Text>H??y c??? l??n, L???y l???i ???? t??ng tr?????ng b???ng m???t s??? g???i ?? c???a ch??ng t??i v??? b???n.</Text>
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
              case 'Kho???n thu kh??c':
              if(e.percentInt>25){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>B???n c?? 1 c??ng vi???c tay tr??i t???t, H??y c??? g???ng ph??t huy nh??! {e.price_category}VND chi???m {e.percentInt}% kho???n thu c???a b???n.</Text>
                </View>
                )
              }
              case 'Nh???n l????ng':
              if(e.percentInt<=60){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Kho???n thu nh???p ch??nh c?? v??? kh??ng ???????c t???t. C??? l??n n??o!</Text>
                </View>
                )
              }
        
              case 'Ti???n th?????ng':
              if(e.percentInt>10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Trong ?????t n??y c??? g???ng xu???t s???c c??ng vi???c c???a m??nh v?? ???????c kho???n th?????ng l???n. H???y t??? th?????ng cho b???n th??n g?? ??i n??o!</Text>
                </View>
                )
              }
            }

          } else {
            switch(e.name) {
              case 'Kho???n chi kh??c':
              if(e.percentInt<5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Kho???n chi kh??ng x??c ?????nh v?????c qu?? 5% b???n n??n ch?? ?? ????? qu???n l?? thu nh???p t???t h??n.</Text>
                </View>
                )
              }
              // continue;
              case 'Sinh ho???t':
              if(e.percentInt>20 || e.percentInt<10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>20?"V???i kinh t??? hi???n t???i c???a b???n. Ch??ng t??i khuy??n b???n n??n gi???m chi ti??u ?????n m???c c?? th??? t??? "+e.percentInt+"% xu???ng 20% c???a t???ng chi.": ""}
                    {e.percentInt<10?"C??ng v???i s??? ph??t tri???n kinh t??? b???n c??ng n??n ch?? tr???ng h??n ?????n vi???c ch??m s??c gia ????nh nh??! "+e.percentInt+"% l?? m???c sinh ho???t trong t???ng s???.": ""}
                    </Text>
                </View>
                )
              }
        
              case 'H???c t???p':
              if(e.percentInt>20 || e.percentInt<10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>20?"H???c t???p l?? ?????u t?? cho t????ng lai, nh??ng h???y ?????u t?? h???p l?? v??o ????ng m???c ????ch nh??!":""}
                    {e.percentInt<10?"H???c t???p l?? ?????u t?? cho t????ng lai, d??nh m???t ch??t th???i gian ????? quan t??m ?????n vi???c ?????u t?? cho t????ng lai c??c con n???a nh??!": ""}
                    </Text>
                </View>
                )
              }
        
              case 'Y t???':
              if(e.percentInt>=20 || e.percentInt<=10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>=20?"C?? v??? s???c kh???e gia ????nh b???n kh??ng ???????c t???t h???y ch??m s??c b???ng nh???ng m??n ??n ph?? h???p ????? c???i thi???n s???c kh???e gia ????nh b???n n??o":""}
                    {e.percentInt<=10?"S???c kh???e l?? quan tr???ng nh???t. H???y ch?? ?? ch??m s??c v?? n??n kh??m s???c kh???e cho gia ????nh n??o.": ""}
                    </Text>
                </View>
                )
              } else {
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Ngo??i c???ng vi???c b???n c??ng n??n ch?? trong ?????n s???c kh???e. Nh??? tham kh???o c??c c??ng th???c n???u ??n t???t cho s???c kh???e c???a ch??ng t??i n??o</Text>
                </View>
                )
              }
              
              case 'Gi???i tr??':
              if(e.percentInt>20 || e.percentInt<5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>=20?"C?? v??? gia ????nh ???? tr???i qua 1 k?? ngh??? vui v??? v?? t???n k??m. H???y c??ng ch??ng t??i ph??t tri???n kinh t??? nh??!":""}
                    {e.percentInt<=5?"Sau m???t kho???n th???i gian l??m vi???c m???t m???i, h???y c??ng gia ????nh t??? ch???c 1 bu???i th??m quan hay vui v??? g???i tr?? c??ng nhau n??o.": ""}
                    </Text>
                </View>
                )
              }

              case 'Mua s???m':
              if(e.percentInt>10){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>N??n mua nh???ng g?? c???n thi???t th??i n??o.</Text>
                </View>
                )
              }
            }
          }
        } else {
          ///<50%
          if(e.pay) {
            switch(e.name) {
              case 'Kho???n thu kh??c':
              if(e.percentInt>30){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>B???n c?? 1 c??ng vi???c tay tr??i t???t, H???y c??? g???ng ph??t huy nh??! {e.price_category}VND chi???m {e.percentInt}% kho???n thu c???a b???n.</Text>
                </View>
                )
              }
              case 'Nh???n l????ng':
              if(e.percentInt<=70){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Kho???n thu nh???p ch??nh c?? v??? kh??ng ???????c t???t. C??? l??n n??o!</Text>
                </View>
                )
              }
        
              case 'Ti???n th?????ng':
              if(e.percentInt>20){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Trong ?????t n??y c??? g???ng xu???t s???c c??ng vi???c c???a m??nh v?? ???????c kho???n th?????ng l???n. H???y t??? th?????ng cho b???n th??n g?? ??i n??o!</Text>
                </View>
                )
              }
            }

          } else {
            switch(e.name) {
              case 'Kho???n chi kh??c':
              if(e.percentInt<2){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Kho???n chi kh??ng x??c ?????nh v?????c qu?? 5% b???n n??n ch?? ?? ????? qu???n l?? thu nh???p t???t h??n.</Text>
                </View>
                )
              }
              // continue;
              case 'Sinh ho???t':
              if(e.percentInt>10 || e.percentInt<5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>10?"V???i kinh t??? hi???n t???i c???a b???n. Ch??ng t??i khuy??n b???n n??n gi???m chi ti??u ?????n m???c c?? th??? t??? "+e.percentInt+"% xu???ng 20% c???a t???ng chi.": ""}
                    {e.percentInt<5?"C??ng v???i s??? ph??t tri???n kinh t??? b???n c??ng n??n ch?? tr???ng h??n ?????n vi???c ch??m s??c gia ????nh nh??! "+e.percentInt+"% l?? m???c sinh ho???t trong t???ng s???.": ""}
                    </Text>
                </View>
                )
              }
        
              case 'H???c t???p':
              if(e.percentInt>10 || e.percentInt<5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>10?"H???c t???p l?? ?????u t?? cho t????ng lai, nh??ng h???y ?????u t?? h???p l?? v??o ????ng m???c ????ch nh??!":""}
                    {e.percentInt<5?"H???c t???p l?? ?????u t?? cho t????ng lai, d??nh m???t ch??t th???i gian ????? quan t??m ?????n vi???c ?????u t?? cho t????ng lai c??c con n???a nh??!": ""}
                    </Text>
                </View>
                )
              }
        
              case 'Y t???':
              if(e.percentInt>=10 || e.percentInt<=5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>{e.percentInt>=10?"C?? kh???e s???c kh???e gia ????nh b???n kh??ng ???????c t???t h???y ch??m s??c b???ng nh???ng m??n ??n ph?? h???p ????? c???i thi???n s???c kh???e gia ????nh b???n n??o":""}
                    {e.percentInt<=5?"S???c kh???e l?? quan tr???ng nh???t. H???y ch?? ?? ch??m s??c v?? n??n kh??m s???c kh???e cho gia ????nh n??o.": ""}
                    </Text>
                </View>
                )
              }
              
              case 'Gi???i tr??':
              if(e.percentInt>5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>Trong th???i gian kh?? kh??n n??y. M???c gi???i tr?? n??n h???n ch??? nh??</Text>
                </View>
                )
              }

              case 'Mua s???m':
              if(e.percentInt>5){
                componentTips.push(
                  <View style = {{flexDirection: "row", flex: 1 ,  paddingBottom: 10, paddingRight: 6}}>
                    <View
                      style = {{backgroundColor: "green", height: 10, width: 10, borderRadius: 5, margin: 5}}
                    />
                    <Text>N??n mua nh???ng g?? c???n thi???t th??i n??o.</Text>
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
                              <Text style = {{color: "#e7b62c", fontWeight: "bold"}}>7 ng??y</Text>
                          </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this._filter("MONTH")}>
                          <View style= {{backgroundColor: "#fff", flex: 1, justifyContent: "center", padding: 8, borderRadius: 20, borderColor: this.state.type=="MONTH"?"#e7b62c":"#E7E9EB", borderWidth: 3, alignItems: "center", marginRight: 10, minWidth: 110}}>
                            <Text style = {{color: "#e7b62c", fontWeight: "bold"}}>1 th??ng</Text>
                          </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this._filter("3M")}>
                          <View style= {{backgroundColor: "#fff", flex: 1, justifyContent: "center", padding: 8, borderRadius: 20, borderColor: this.state.type=="3M"?"#e7b62c":"#E7E9EB", borderWidth: 3, alignItems: "center", marginRight: 10, minWidth: 110}}>
                              <Text style = {{color: "#e7b62c", fontWeight: "bold"}}>3 th??ng</Text>
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
                        <Text style= {{color: "red"}}>T???ng s??? ti???n chi: -{this.state.spendingSumSV.sO} VND </Text> 
                        <Text>({this.state.spendingSumSV.pO})%</Text>
                    </View>
                    <View style = {{flexDirection:'row', paddingTop: 10}}>
                        
                        <Text style= {{color:"green"}}>T???ng s??? ti???n thu: {this.state.spendingSumSV.sI} VND </Text>
                        <Text>({this.state.spendingSumSV.pI})%</Text>
                    </View>

                    <View style = {{flexDirection:'row', paddingTop: 10}}>
                        <Text style ={{fontWeight: "bold", fontSize: 18}}>T???ng s??? ti???n c??n l???i:{this.state.spendingSumSV.sS} VND </Text>
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
                      <Text style= {{fontSize: 20, borderBottomColor: "#e7b62c", borderBottomWidth: 3}}>L???i khuy??n cho b???n</Text>
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