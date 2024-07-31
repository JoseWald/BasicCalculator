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
        let op=this.state.operation
        // eslint-disable-next-line no-eval
        op=eval(op.join(''))
        this.setState({displaying:op})
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
