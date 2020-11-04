import React from 'react';
import logo from './logo.svg';
import './App.css';


const withImpuestos = (Component) =>{
  return(config)=> class extends React.Component{
    state = {
      sucursal: config.sucursal,
      pago: "$" + config.pago,
      impuesto:
        "$" + (config.pago * config.impuesto)
        + " al " + (config.impuesto*100) + "%",
      ganancia: "$" + (config.pago - (config.pago * config.impuesto))
    }

    calcularImpuesto = (pago)=>{
      this.setState({
        pago: "$" + pago,
        impuesto:
          "$" + (pago * config.impuesto)
          + " al " + (pago - (pago * config.impuesto)),
        ganancia: "$" + (pago - (pago * config.impuesto))
      })
    }

    render(){
      return (
        <Component 
        sucursal={this.state.sucursal}
        pago={this.state.pago}
        impuesto={this.state.impuesto}
        ganancia={this.state.ganancia}
        calcularImpuesto={this.calcularImpuesto}/>
      )
    }
  }
}


function App(props) {
  const {sucursal, pago, impuesto, ganancia, calcularImpuesto} = props;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Impuestos sucursal {sucursal}</h1>
        <input type="number" onChange={(e)=>{
          calcularImpuesto(e.target.value)
        }}/>
        <p>{"Pago: " + pago}</p>
        <p>{"Impuesto: " + impuesto}</p>
        <p>{"Gananacia: " + ganancia}</p>
        <a
          className="App-link"
          href="https://welteach.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tutorial ReactJS con Welteach
        </a>
      </header>
    </div>
  );
}

export default withImpuestos(App)({
  sucursal:1,
  pago:0,
  impuesto:0.16,
  ganancia:0
});
