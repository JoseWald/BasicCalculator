import React , {Component} from "react";
class Calculator extends Component{
    constructor(){
        super()
        this.state={
            displaying:"",
            operation:[],
            result:0
        }
        this.handleOperation=this.handleOperation.bind(this)
        this.delete=this.delete.bind(this)
    }

    handleOperation(val){
        let tmpArray
        this.setState((prevState)=>{
            tmpArray=[...prevState.operation,val]
            return{
                operation:tmpArray
            }
           
        },()=>{
            this.setState({displaying:this.state.operation.join('')})
        })
    }
   
    calculate() {
        const op=this.state.operation
        let tmpresult
        let firstTime=true//the first time tmpresult is assigned
        let b0=true
        let lastSliceInd=0//Next Index of the Operator
        let prevOpInd=0//Previous Index of the Operator
        for(let i=0;i<this.state.operation.length;i++){
                if((i===op.length-1||op[i]==='+'||op[i]==='-'||op[i]==='*'||op[i]==='/') && firstTime){
                        lastSliceInd=i+1
                        if(i!==op.length-1){
                            lastSliceInd=i
                        }
                        tmpresult=Number(op.slice(0,lastSliceInd).join(''))
                        firstTime=false
                        prevOpInd=i
                }
                if((!firstTime && (op[i]==='+'||op[i]==='-'||op[i]==='*'|| op[i]==='/'))||i===op.length-1)  {
                    lastSliceInd=i+1
                    if(i!==op.length-1){
                        lastSliceInd=i
                    }
                  
                    console.log("a="+tmpresult)  
                    switch(op[prevOpInd]){
                        case '+':{
                            tmpresult+=Number(op.slice(prevOpInd+1,lastSliceInd).join(''))
                            break
                        }

                        case '-':{
                            tmpresult-=Number(op.slice(prevOpInd+1,lastSliceInd).join(''))
                            break
                        }

                        case '*':{
                            //at the first time b===0 and it may cause a bug to the division and multiplication
                            if(op[i]==='*' && b0===true){
                                b0=false
                                break
                            }
                            tmpresult*=Number(op.slice(prevOpInd+1,lastSliceInd).join(''))
                            break
                        }

                        case '/':{
                              //at the first time b===0 and it may cause a bug to the division and multiplication
                              if(op[i]==='/' && b0===true){
                                b0=false
                                break
                              }
                            
                            tmpresult/=Number(op.slice(prevOpInd+1,lastSliceInd).join(''))
                            break
                        }
                    
                      
                    }
                 
                    console.log("b="+Number(op.slice(prevOpInd+1,lastSliceInd).join('')))           
                    prevOpInd=i
                }
                //provide if there is an infinite value
                if((!isFinite(tmpresult)||isNaN(tmpresult)) && !firstTime){
                    this.setState({displaying:"ERROR"})
                    console.log(tmpresult+"tmp")
                    break
                }
                if(i===op.length-1){
                    this.setState({displaying:"="+tmpresult})
                }
           
        }
        console.log(tmpresult)
     
          
     
    }

    delete(){
        let tmpArray=[...this.state.operation]
        tmpArray.pop()
        this.setState((prevState)=>{
            return{
                operation:tmpArray
            }
           
        },()=>{
            this.setState({displaying:this.state.operation.join('')})
        })
    }
    clear(){
        this.setState({operation:[]})
        this.setState({displaying:""})
    }

    render(){
        const buttonStyle={
            width:"50px",
            height:"50px"
        }
        return(
            <div>
                <input 
                        type="text" 
                       style={{height:"50px",width:"200px"}} 
                       value={this.state.displaying} 
                >
                </input>
                <br/>
               
               <div>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(1)}> 1 </button>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(2)}> 2 </button>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(3)}> 3 </button>
              </div>
               <div>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(4)}> 4 </button>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(5)}> 5 </button>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(6)}> 6 </button>
               </div>
               <div>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(7)}> 7 </button>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(8)}> 8 </button>
                    <button style={buttonStyle} onClick={()=>this.handleOperation(9)}> 9 </button>
               </div>
                    <button style={{width:"150px",height:"70px"}} onClick={()=>this.handleOperation(0)}> 0 </button>
               <br/>
               <button style={buttonStyle} onClick={()=>this.handleOperation("+")} > + </button> 
               <button style={buttonStyle} onClick={()=>this.handleOperation("-")} > - </button> 
               <button style={buttonStyle} onClick={()=>this.handleOperation("*")} > * </button> 
               <button style={buttonStyle} onClick={()=>this.handleOperation("/")} > / </button> 
               <br/>
               
               <button style={buttonStyle} onClick={()=>this.clear()}> C </button>
               <button style={buttonStyle} onClick={()=>this.delete()} > del </button>
               <button style={{width:"100px",height:"50px"}} onClick={()=>this.calculate()} > = </button>
            </div>
        )
    }
}
export default Calculator