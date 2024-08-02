import React, { Component } from "react";

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            displaying: "",
            operation: [],
            result: 0,
        };
        this.handleOperation = this.handleOperation.bind(this);
        this.delete = this.delete.bind(this);
        this.clear = this.clear.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    handleOperation(val) {
        this.setState(
            (prevState) => ({
                operation: [...prevState.operation, val],
            }),
            () => {
                this.setState({ displaying: this.state.operation.join("") });
            }
        );
    }

    calculate() {
        let op = this.state.operation;
        // eslint-disable-next-line no-eval
        op = eval(op.join(""));
        this.setState({ displaying: op });
    }

    delete() {
        this.setState(
            (prevState) => {
                const tmpArray = [...prevState.operation];
                tmpArray.pop();
                return {
                    operation: tmpArray,
                };
            },
            () => {
                this.setState({ displaying: this.state.operation.join("") });
            }
        );
    }

    clear() {
        this.setState({ operation: [], displaying: "" });
    }

    render() {
        const buttonStyle = {
            width: "50px",
            height: "50px",
        };

        return (
            <div>
                <input
                    type="text"
                    style={{ height: "50px", width: "200px" }}
                    value={this.state.displaying}
                    readOnly
                />
                <br />

                <div>
                    {[1, 2, 3].map((num) => (
                        <button
                            key={num}
                            style={buttonStyle}
                            onClick={() => this.handleOperation(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div>
                    {[4, 5, 6].map((num) => (
                        <button
                            key={num}
                            style={buttonStyle}
                            onClick={() => this.handleOperation(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div>
                    {[7, 8, 9].map((num) => (
                        <button
                            key={num}
                            style={buttonStyle}
                            onClick={() => this.handleOperation(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div>
                    <button
                        style={{ width: "150px", height: "70px" }}
                        onClick={() => this.handleOperation(0)}
                    >
                        0
                    </button>
                </div>
                <br />
                <div>
                    {["+", "-", "*", "/"].map((op) => (
                        <button
                            key={op}
                            style={buttonStyle}
                            onClick={() => this.handleOperation(op)}
                        >
                            {op}
                        </button>
                    ))}
                </div>
                <br />
                <div>
                    <button style={buttonStyle} onClick={this.clear}>
                        C
                    </button>
                    <button style={buttonStyle} onClick={this.delete}>
                        del
                    </button>
                    <button
                        style={{ width: "100px", height: "50px" }}
                        onClick={this.calculate}
                    >
                        =
                    </button>
                </div>
            </div>
        );
    }
}

export default Calculator;
