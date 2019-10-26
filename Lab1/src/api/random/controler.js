randomControler ={
    randomNumber: function (request, response)
    {
    //отримання параметрів
    let from = request.query["from"] || 0;
    let to = request.query["to"] || 1;
    
    //логіка робти
    let res = (to-from)*Math.random()+from;
    
    //відповідь
    response.send({
    "random number":res
    });
    },
    randomArray: function (request, response){
        //отримання параметрі
        let len = request.query["len"] || 0;
        
        //логіка робти
        res=[]; 
        for (let i=0;i<len;i++)        
        {        
        res[i] = Math.random();       
        }
        
        //відповідь     
        response.send({       
        "random array":res,       
        "len":len        
      });
        
        }
        }
        module.exports=randomControler;