
const URL = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('eventos');

fetch(URL).then((resp) => resp.json()).then(function(data) {

    let dict= { }


  var temp = "";
  for (let i = 0; i < data.length; i++) {
    
    if(data[i].squirrel){
        temp += "<tr class = 'table-danger'";
    }
    else{
        temp += "<tr class = 'table'";

    }
        temp += "<th scope='row'> </th>";
        temp += "<td>"  + i+ "</td>";
        temp += "<td>"  + data[i].events + "</td>";
        temp += "<td>"  + data[i].squirrel + "</td>"+ "</tr>";
        data[i].events.forEach(element => {
            TPFN(element,data[i].squirrel,dict)
        });
        document.getElementById('eventos').innerHTML = temp;
    }

 for (let i = 0; i < data.length; i++) {
        TNFP(data[i],dict); 
        }

        
        i=0
        temp = "";

    Object.keys(dict).forEach(element => {

        tp=dict[element][0];
        tn=dict[element][1];
        fp=dict[element][2];
        fn=dict[element][3];
        dict[element]= (((tp*tn)-(fp*fn))/(Math.sqrt((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn))));

        temp += "<tr class = 'table'";
        temp += "<th scope='row'> </th>";
        temp += "<td>"  + i+ "</td>";
        temp += "<td>"  + element+ "</td>";
        temp += "<td>"  + dict[element]+ "</td>"+ "</tr>";
        
        document.getElementById('correlation').innerHTML = temp;
        i++;
        });

}).catch(function(error) {
  console.log(error);
});




function TPFN(event,squirrell,dict){


    if(!dict[event])
    {
        dict[event]=[0,0,0,0,0];
    }
    if(squirrell)
    {
        //TP
        dict[event][0]+=1;
    }
    else
    {
        //FN
        dict[event][3]+=1;
   
    }

}

function TNFP(dia,dict){
    Object.keys(dict).forEach(element => {
        if(!dia.events.includes(element))
        {
            if(!dia.squirrel)
            {
                //TN
                dict[element][1]+=1;
            }
            else
            {
                //FP
                dict[element][2]+=1;
            }

        }
    });
}

