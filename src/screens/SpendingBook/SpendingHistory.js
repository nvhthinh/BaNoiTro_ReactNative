import React from "react";
import {View, Text, Image, FlatList, TouchableHighlight, Button, Picker, TextInput } from "react-native";
import { Input, Icon} from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import styles from './styles';
import { spending } from '../../data/dataArrays';
import Modal from 'react-native-modal';
import DateTimePicker from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';
export default class SpendingHistory extends React.Component {
    state = {
      // visibleModal: 1,
      visibleModal: 0,
      choosenIndex: 0,
      datePickerVisible: false,
      date: "",
      price: "0,000",
      checked: "first",
    };
    
    componentDidMount() {
      this.getDate();
    }
    
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
      console.log(day, "_________________");
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
      let formattedPrice = Number(price).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
                // style={styles.fastSearchItemBt}
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
    _renderModalAdd = () => (
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

        {/* render from */}
        {this._renderForm(this.state.checked)}
      </View>
    );

    _renderModalEdit = () => (
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

        {/* render from */}
        {this._renderForm(this.state.checked)}
      </View>
    );

    renderCategory = ({ item }) => (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() =>  this.setState({ visibleModal: 2 })}>
        <View style={styles.spendingItemContainer}>
          <View style = {{flexDirection:'row', paddingTop: 10}}>
            <View>
              <View style = {{backgroundColor: "#e7b62c8c", height: 55, width: 50, borderRadius: 10}}>
                <Text style= {{color: "#ff6a00",  flex: 1,textAlign: 'center', padding: 13, fontSize: 20}}>{item.date[1]}</Text>
              </View>
            </View>
            <View style = {{paddingLeft: 10}}>
              <Text style = {{fontWeight: "bold", paddingBottom: 10}}>Thứ {item.date[0]}</Text>
              <Text>Tháng {item.date[2]}</Text>
            </View>
          </View>
          <View style = {{flex: 1, flexDirection:'row',}}>
            <Text style={styles.spendingName}>{item.name}</Text>
            <Text style={styles.spendingPrice}>{item.price}đ</Text>
          </View>
          <Text style={styles.spendingInfo}><Image style={{height: 25, width: 25}} source={require("../../../assets/icons/pin-icon.png")} />{item.category}</Text>
        </View>
      </TouchableHighlight>
    );
    render() {
        return (
          <View style={styles.spendingContainer}>
              {/* //import */}
            <View style = {{width: "95%", margin: 10}}>
                <Searchbar
                    placeholder="Search"
                    // onChangeText={onChangeSearch}
                    // value={searchQuery}
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
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
                            <View style= {{backgroundColor: "#fff", flex: 1, justifyContent: "center", paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderRadius: 20, borderColor: "#E7E9EB", borderWidth: 3}}>
                                <Text style = {{color: "#e7b62c", fontWeight: "bold"}}><Image style={{height: 25, width: 25}} source={require("../../../assets/icons/pin-icon.png")} /> Danh mục</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={styles.spendingTotalContainer}>
                    <View style = {{flex: 1, flexDirection:'row',}}>
                        <Text style={styles.spendingTotalTxt}>20 giao dịch</Text>
                        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.setState({ visibleModal: 1 })}>
                            <View style= {{backgroundColor: "#e7b62c", flex: 1, justifyContent: "center", paddingLeft: 10, paddingRight: 10, paddingBottom: 15, paddingTop: 10, borderRadius: 10, borderColor: "#E7E9EB", borderWidth: 1}}>
                                <Text style = {{color: "#fff", fontWeight: "bold"}}><Image style={{height: 20, width: 20}} source={require("../../../assets/icons/add-icon.png")} /> Thêm chi tiêu</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <FlatList
                    data={spending}
                    renderItem={this.renderCategory}
                    keyExtractor={item => `${item.id}`}
                />
            </View>

            {/* Modal edit*/}
            <Modal isVisible={this.state.visibleModal === 2}>
                {this._renderModalEdit()}
            </Modal>

            {/* Modal add*/}
            <Modal isVisible={this.state.visibleModal === 1}>
                {this._renderModalAdd()}
            </Modal>

          </View>
        );
    }
}