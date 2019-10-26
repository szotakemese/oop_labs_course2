task1 ={
    seventhOfTask1: function (request, response)
    {
    let num = request.query["n"] ||0;
    let n = Math.round(num);
    if(n>=100){
        if(n<=999){
            let a = Math.floor(n/100);
            let b = Math.floor((n-(a*100))/10);
            let c = n-(a*100)-(b*10);
            if(a>=b){
                if(a>=c){
                    response.send("n= "+n+"<p>First digit is the biggest number. </p>")
                }
                response.send("n= "+n+"<p>Last digit is the biggest number. </p>")
            }
            if(b>=c){
                response.send("n= "+n+"<p>Middle digit is the biggest number. </p>")
            }
            response.send("n= "+n+"<p>Last digit is the biggest number. </p>")
        }
        response.send("n= "+n+"<p>Number is too big. </p><h4>Enter a new number: http://localhost:3000/api/task1?n= ...</h4>")
    }
    response.send("n= "+n+"<p>Number is too small</p><h4>Enter a new number: http://localhost:3000/api/task1?n= ...</h4>")
}
}
module.exports=task1;