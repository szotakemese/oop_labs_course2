task2 ={
    abonent: function (request, response){    
        let talkTime = request.query["t"] ||0;
        const abonents=[{tel: 0111111, adress: ['London', 'A', 1], owner: 'S. Holmes', totalTalkTime: 5},
                        {tel: 0222222, adress: ['California', 'B', 2], owner: 'T. Stark', totalTalkTime: 7},
                        {tel: 0333333, adress: ['Rome', 'C', 3], owner: 'S. Mario', totalTalkTime: 3.2},
                        {tel: 0444444, adress: ['Uzhhorod', 'D', 4], owner: 'H. Potter', totalTalkTime: 4.5}];
        
        let arr = abonents.filter((item) =>{
            return( !talkTime || item.totalTalkTime>talkTime)
        }) 
        response.send(arr);
    
    }
}
module.exports=task2;