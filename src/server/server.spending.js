async function dataSpendingChartSV(idLG) {
    try {
      const idLG = await AsyncStorage.getItem('idLG');
      console.log("./Start ...............................", idLG)
      await fetch('http://192.168.1.8:3000/api/spendingSummary',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'id': idLG,
          'type': 'MONTH'
        })
      }).then((response)=>response.json())
      .then((res)=>{
      //   this.setState({refreshing: false});
        if(res.status===1){
          let data = res.body.data;
          console.log("sc sp ", data);
          return data;
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
export {dataSpendingChartSV};