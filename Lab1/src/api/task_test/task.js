taskTest ={
    taskTest: function (request, response)
    {
    const a = request.query["a"] ||1;
    if(a<1){
        response.send("While a="+ a +", a is not correct")
    }
    let a1 = 1/a;
    let a2 = Math.sin(a);
    if(a1>a2){
        response.send("While a="+ a +", 1/a is greater than sin(a)")
    }
    
    response.send("While a="+ a +", sin(a) is greater than 1/a")
        
    }
}
module.exports=taskTest;