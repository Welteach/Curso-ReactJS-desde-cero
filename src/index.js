import React,{useState,useEffect,useContext,useReducer} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import datos from './data.json';
import {esNombre} from './validaciones';
import {esCorreo} from './validaciones';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

const initialSate = {
  count:0,
  countInterval:1,
  increment:true
}

const reducer = (state, action)=>{
  switch(action.type){
    case "INCREMENT":
      return{
        ...state,
        increment: action.increment
      }
    case "SET_INTERVAL":
      return{
        ...state,
        countInterval: parseInt(action.countInterval)
      }
    case "INCREASE_COUNT":
      return{
        ...state,
        count: state.count + state.countInterval
      }
    case "DECREASE_COUNT":
        return{
          ...state,
          count: state.count - state.countInterval
        }
    case "RESTART":
      return initialSate;
    default:
      return state;
  }
}


const Counter = ()=>{
  const [state, dispatch] = useReducer(reducer, initialSate);

  const handleIngrement = (e)=>{
    const {checked}=e.target;
    dispatch({type:"INCREMENT",increment:checked});
  }

  const handleCount = (e)=>{
    if(state.increment){
      dispatch({type:"INCREASE_COUNT"});
    }else{
      dispatch({type:"DECREASE_COUNT"});
    }
  }

  const handleCountInterval = (e)=>{
    const {value}=e.target;
    dispatch({type:"SET_INTERVAL",countInterval:value});
  }

  const handleRestart = (e)=>{
    dispatch({type:"RESTART"});
  }
  
  return (
    <div className="padre">
        <h1>{"Hook useReducer con Welteach"}</h1>
        <p>{"Cuenta: " + state.count}</p>
        <div>
          <input 
          type="checkbox"
          id="chk"
          checked={state.increment}
          onChange={handleIngrement}/>
          <label htmlFor="chk">
            {"Incrementar"}
          </label>
        </div>
        <br />
        <div>
          <label htmlFor="interval">
            {"Intervalo"}
          </label>
          <input
          type="text"
          id="interval"
          value={state.countInterval}
          onChange={handleCountInterval}/>
        </div>
        <br />
        <button onClick={handleCount}>
          {state.increment ? "Incrementar":"Decrementar"}
        </button>
        <button onClick={handleRestart}>
          {"Reiniciar"}
        </button>
    </div>
  )
}



ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);


/*
setInterval(()=>{
  propiedades = {
    ...propiedades,
    hijo1:{
      ...propiedades.hijo1,
      cuenta:propiedades.hijo1.cuenta + 1
    },
    hijo2:{
      ...propiedades.hijo2,
      cuenta:propiedades.hijo2.cuenta + 10
    }
  }

  ReactDOM.render(
    <Padre {...propiedades} />,
    document.getElementById('root')
  );
}, 1000);
*/

/*
var p = React.createElement('p',{className:'style-parrafo'},'Curso de ReactJS');

var container = React.createElement('div',{className:'container'},p);

var div = (
    <div className="container">
      <p className="style-parrafo">Curso de ReactJS</p>
    </div>
);

function HolaMundo(props){
  return <p>Mi primer componente personalizado</p>
}

function Contenedor(){
  return <HolaMundo />
}

function HolaMundoProps(props){
  return (
    <>
      <p>{props.titulo + ' ' + '1'}</p>
      <p>{props.titulo + ' ' + (1+props.indice)}</p>
    </>
  )
}

function ContenedorDos(){
  return <HolaMundoProps titulo="Curso de ReactJS - props" indice={10} />
}

function ElementoUno (props){
  return (
    <div className="container">
      <p className="style-parrafo">{"Título: " + props.titulo}</p>
      <p className="style-parrafo">{"Capitulo: " + props.capitulo}</p>
    </div>
  )
}

function Componente(){
  const props = {
    titulo:"Curso ReactJS",
    capitulo:"Introducción a JSX"
  }
  return <ElementoUno {...props} />
}

function _Padre(props){
  return (
    <div className="padre">
       <h1>{"Componente Padre"}</h1>
       <div className="componentes">
          <div className="componente">
              <h2>{"Hijo 1"}</h2>
              <p>{"Contador"}</p>
              <p>{"1"}</p>
          </div>   
          <div className="componente">
              <h2>{"Hijo 2"}</h2>
              <p>{"Contador"}</p>
              <p>{"1"}</p>
          </div>   
       </div>
    </div>
  )
}

class Hijo1 extends React.Component{
  state = {
      titulo:"Hijo 1",
      subtitulo:"Contador",
      cuenta:1
  }

   constructor(props){
     super(props);
     /*
     this.state = {
        titulo:"Hijo 1",
        subtitulo:"Contador",
        cuenta:1
     }
     this.disminuir = this.disminuir.bind(this);
   }

   disminuir(){
     if(this.state.cuenta <= 0){
       this.setState({
          ...this.state,
          cuenta:0
       });
     }else{
       this.setState({
        ...this.state,
        cuenta:this.state.cuenta - 1
       });
     }
     console.log(this.state);
   }

   aumentar=()=>{
     this.setState({
        ...this.state,
        cuenta:this.state.cuenta + 1
     });
   }


  render(){
    return (
      <div className="componente">
          <h2>{this.state.titulo}</h2>
          <p>{this.state.subtitulo}</p>
          <div className="controles">
              <span 
                 className="control"
                 onClick={this.disminuir}>-</span> 
              <span 
                 className="control"
                 onClick={this.aumentar}>+</span> 
          </div>
          <p>{this.state.cuenta}</p>
      </div>
    )
  }
}

// Hook useState
function Hijo2 (props){
  const [state, setState] = useState({
      titulo:"Hijo 2",
      subtitulo:"Contador",
      cuenta:1
  });

  const disminuir = ()=>{
    if(state.cuenta <= 0){
      setState({
         ...state,
         cuenta:0
      });
    }else{
      setState({
       ...state,
       cuenta:state.cuenta - 1
      });
    }
  }

  const aumentar = ()=>{
    setState({
      ...state,
      cuenta:state.cuenta + 1
    });
  }

  return (
    <div className="componente">
        <h2>{state.titulo}</h2>
        <p>{state.subtitulo}</p>
        <div className="controles">
            <span 
                className="control"
                onClick={disminuir}>-</span> 
            <span 
                className="control"
                onClick={aumentar}>+</span> 
          </div>
        <p>{state.cuenta}</p>
    </div>
  )
}

let propiedades = {
  hijo1:{
    titulo:"Hijo 1",
    subtitulo:"Contador",
    cuenta:1
  },
  hijo2:{
    titulo:"Hijo 2",
    subtitulo:"Contador",
    cuenta:1
  }
}

function Padre(props){
  return (
    <div className="padre">
       <h1>{"Componente Padre"}</h1>
       <div className="componentes">
          <Hijo1 {...props.hijo1} /> 
          <Hijo2 {...props.hijo2} />
       </div>
    </div>
  )
}


class Hijo extends React.Component{
  state = {
    titulo:"Hijo",
    subtitulo:"Contador",
    cuenta:1
  }

  intervalo = null;

  componentDidMount(){
    console.log("componentDidMount")

    this.intervalo = setInterval(()=>{
        this.setState({
            cuenta:this.state.cuenta + 1
        })
        console.log(this.state)
    }, 1000)
  }

  componentWillUnmount(){
    console.log("componentWillUnmount")
    clearInterval(this.intervalo);
  }

  render(){
    return (
      <div className="componente">
          <h2>{this.state.titulo}</h2>
          <p>{this.state.subtitulo}</p>
          <p>{this.state.cuenta}</p>
      </div>
    )
  }
}

function PadreUno(props){
  const [ver, setVer] = useState(false) 
  const verComponente = ()=>{
    setVer(!ver)
  }

  return (
    <div className="padre">
       <h1>{"Componente Padre"}</h1>
       <button className="espaciado" onClick={verComponente}>{ver ? "Ocutar":"Ver"}</button>
       <div className="componentes">
          {
            ver ? (<Hijo />):("")
          }
       </div>
    </div>
  )
}
class Componente extends React.Component{
  render(){
    return (
      <>
        <h2 className="centrar">{"Curso de ReactJS - Listas y condiciones"}</h2>
        <div className="cont-tabla">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Cantidad vendidos</th>
                  <th>En almacen</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {
                  datos.map((dato, index)=>(
                    <tr
                    key={dato.id}
                    className={index%2 == 0 ? '':'trColor'}>
                      <td>{dato.nombre}</td>
                      <td>{dato.categoria}</td>
                      <td>{dato.precio}</td>
                      <td>{dato.cantidad_vendidos}</td>
                      <td>{dato.en_almacen}</td>
                      <td>{dato.fecha_alta}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div>
      </>
    )
  }
}*/
// Inputs no controlados
/*
class Componente extends React.Component{

  clicEventos(evento){
    evento.preventDefault();
    console.log(evento.target[0].value);
    console.log(evento.target[1].value);
  }

  render(){
    return (
      <form onSubmit={this.clicEventos}>
        <h1>{"Formularios Welteach"}</h1>
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Correo" />
        <button>
          Enviar
        </button>
      </form>
    )
  }
}


// Inputs controlados
class InputText extends React.Component {
  constructor(props){
    super(props);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      value:"",
      error:false,
      mensajeError:""
    }
  }

  actualizarState(e){
    const {name, value} = e.target;
    console.log(this.props.validacion(value));

    if(this.props.validacion(value)){
      this.setState({
        value,
        error:false,
        mensajeError:""
      });
      this.props.actualizarState({
        name,value,error:false
      });
    }else{
      this.setState({
        value,
        error:true,
        mensajeError:this.props.mensajeError
      });
    }
  }


  render(){
    return (
      <div className="componente-input">
        <label htmlFor={"id-"+this.props.name}>{this.props.label}</label>
        <input 
          id={"id-"+this.props.name}
          type="text"
          name={this.props.name}
          placeholder={this.props.placeholder}
          className=""
          onChange={this.actualizarState}/>
          {
            this.state.error ? (
              <p className="componente-input-error">{this.state.mensajeError}</p>
            ):("")
          }
      </div>
    )
  }
}

class InputCheckbox extends React.Component {
  constructor(props){
    super(props);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      activo:false,
    }
  }

  actualizarState(e){
    const {name, checked} = e.target;
    this.setState({activo:checked});
    this.props.actualizarState({
      name,value:checked,error:false
    })
  }
  
  render(){
    return (
      <div>
        <input 
          id={"id-"+this.props.name}
          type="checkbox"
          name={this.props.name}
          checked={this.props.activo}
          onChange={this.actualizarState}/>
          <label htmlFor={"id-"+this.props.name}>{this.props.label}</label>
      </div>
    )
  }
}

class InputSelect extends React.Component {
  constructor(props){
    super(props);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      activo:"",
    }
  }

  actualizarState(e){
    const {name, value} = e.target;
    this.setState({value});
    this.props.actualizarState({
      name,value,error: value == "" ? true:false
    })
  }
  
  render(){
    return (
      <div className="componente-input">
        <label htmlFor={"id-"+this.props.name}>{this.props.label}</label>
        <select
          id={"id-"+this.props.name}
          name={this.props.name}
          onChange={this.actualizarState}>
            {
              this.props.opciones.map((opcion, index)=>(
                <option hey={index} value={opcion.value}>{opcion.texto}</option>
              ))
            }
        </select>
      </div>
    )
  }
}

class Componente extends React.Component{

  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      nombre:{
        value:"",
        error:true
      },
      correo:{
        value:"",
        error:true
      },
      prioridad:{
        value:false,
        error:true
      },
      opciones:{
        value:"",
        error:true
      }
    }
  }

  actualizarState(input){
    this.setState({
      ...this.state,
      [input.name]:{
        value:input.value,
        error:input.error
      }
    }, ()=>{console.log(this.state);});
  }

  submit(e){
    e.preventDefault();
    console.log(this.state)
  }

  render(){
    return (
      <form onSubmit={this.submit}>
        <h1>{"Formularios Welteach"}</h1>
        <InputText
          label="Nombre"
          name="nombre"
          placeholder="Nombre"
          validacion={esNombre}
          mensajeError="Se esperaban letras"
          actualizarState={this.actualizarState} />

        <InputText
          label="Correo"
          name="correo"
          placeholder="Correo"
          validacion={esCorreo}
          mensajeError="Correo no valido"
          actualizarState={this.actualizarState} />

        <InputCheckbox
          label="Prioridad"
          name="prioridad"
          actualizarState={this.actualizarState} />

        <InputSelect
          label="Elige una opción:"
          name="opciones"
          actualizarState={this.actualizarState} 
          opciones={[
              {value:"", texto:"Seleccione una opción..."},
              {value:"1", texto:"Página web"},
              {value:"2", texto:"Aplicación móvil"},
          ]} />
        
        <button
          type="submit"
          className={this.state.nombre.error ||
            this.state.correo.error ||
            this.state.opciones.error
          ? 
          "button-disable":"button"}>
          Enviar
        </button>
      </form>
    )
  }
}
*/
/*
const {Provider, Consumer} = React.createContext();

const HijoUno = (props)=>{
    return (
      <Consumer>
        {
          ({mensaje, index, actualizarMensaje})=>(
            <div className="hijo">
              <h1>Hijo 1</h1>
              {
                mensaje !== "" ? (
                  <p className={
                    index === 0 ? 'colorPadre':
                    index === 1 ? 'colorHijo1':
                    index === 2 ? 'colorHijo2':''
                  }>{
                    ((index === 0 ? 'Padre dice:':
                      index === 1 ? 'Hijo 1 dice:':
                      index === 2 ? 'Hijo 2 dice:':'')
                      + ' ' + mensaje)
                  }</p>
                ):("")
              }
              <textarea rows="5"
              onChange={(e)=>{
                actualizarMensaje(e,1);
              }} />
            </div>
          )
        }
      </Consumer>
    )
}

const HijoDos = (props)=>{
  return (
    <Consumer>
      {
        ({mensaje, index, actualizarMensaje})=>(
          <div className="hijo">
            <h1>Hijo 2</h1>
            {
              mensaje !== "" ? (
                <p className={
                  index === 0 ? 'colorPadre':
                  index === 1 ? 'colorHijo1':
                  index === 2 ? 'colorHijo2':''
                }>{
                  ((index === 0 ? 'Padre dice:':
                    index === 1 ? 'Hijo 1 dice:':
                    index === 2 ? 'Hijo 2 dice:':'')
                    + ' ' + mensaje)
                }</p>
              ):("")
            }
            <textarea rows="5"
              onChange={(e)=>{
                actualizarMensaje(e,2);
              }} />
          </div>
        )
      }
    </Consumer>
  )
}

class Padre extends React.Component{
  constructor(props){
    super(props)
    this.state={
      mensaje:"",
      index:0
    }
  }

  actualizarMensaje = (e, index)=>{
    const {value} = e.target;
    this.setState({
      ...this.state,
      mensaje:value,
      index
    })
  }

  render(){
    return (
      <Provider value={{
        mensaje: this.state.mensaje,
        index: this.state.index,
        actualizarMensaje: this.actualizarMensaje
      }}>
        <div className="padre">
          <h1>Welteach - API Context</h1>
          {
            this.state.mensaje !== "" ? (
              <p className={
                this.state.index === 0 ? 'colorPadre':
                this.state.index === 1 ? 'colorHijo1':
                this.state.index === 2 ? 'colorHijo2':''
              }>{
                ((this.state.index === 0 ? 'Padre dice:':
                  this.state.index === 1 ? 'Hijo 1 dice:':
                  this.state.index === 2 ? 'Hijo 2 dice:':'')
                  + ' ' + this.state.mensaje)
              }</p>
            ):("")
          }
          <textarea 
          rows="5" 
          onChange={(e)=>{
            this.actualizarMensaje(e,0);
          }}/>
          <div className="hijos">
            <HijoUno />
            <HijoDos />
          </div>
        </div>
      </Provider>
    )
  }
}

*/
/*
const Child1 = (props)=>{
  return(
    <div className="hijo">
      <h2>{"Hijo 1"}</h2>
      <p>{props.componente + " " + props.mensaje}</p>
      <textarea rows="5" onChange={(e)=>{
        props.actualizarState(e.target.value, "Hijo 1 dice:")
      }}/>
    </div>
  )
}

const Child2 = (props)=>{
  return(
    <div className="hijo">
      <h2>{"Hijo 2"}</h2>
      <p>{props.componente + " " + props.mensaje}</p>
      <textarea rows="5" onChange={(e)=>{
        props.actualizarState(e.target.value, "Hijo 2 dice:")
      }}/>
    </div>
  )
}

class Padre extends React.Component{
  constructor(props){
    super(props);
    this.state={
      mensaje:"",
      componente:""
    }
  }

  actualizarState = (mensaje, componente)=>{
    this.setState({mensaje, componente})
  }

  render(){
    const {children: propsChildren} = this.props;

    let children = React.Children.map(propsChildren,(child, index)=>{
      return React.cloneElement(child,{
        mensaje: this.state.mensaje,
        componente: this.state.componente,
        actualizarState: this.actualizarState,
      });
    })

    return(
      <div className="padre">
        <h1>{"Props Children con Welteach"}</h1>
        <p>{this.state.componente + " " + this.state.mensaje}</p>
        <textarea rows="5" onChange={(e)=>{
          this.actualizarState(e.target.value, "Padre dice:")
        }}/>
        <div className="hijos">
          {
            children
          }
        </div>
      </div>
    )
  }

}
*/
/*
class Componente extends React.Component{
  static propTypes = {
    texto: PropTypes.string,
    numero: PropTypes.number.isRequired,
    correo: function(props, propName, componentName){
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(props[propName])){
        return new Error(
          `Prop no cuenta con un formato de correo ${propName}, para ${componentName}. Error en la validación.`
        )
      }
    }
  }
  render(){
    return (
      <>
        <p>{this.props.texto}</p>
        <p>{this.props.numero}</p>
        <p>{this.props.correo}</p>
      </>
    )
  }
}

const _Componente = props =>{
  return (
    <>
      <p>{props.texto}</p>
      <p>{props.numero}</p>
      <p>{props.correo}</p>
    </>
  )
}

_Componente.propTypes = {
  texto: PropTypes.string,
  numero: PropTypes.number.isRequired,
  correo: function(props, propName, componentName){
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(props[propName])){
      return new Error(
        `Prop no cuenta con un formato de correo ${propName}, para ${componentName}. Error en la validación.`
      )
    }
  }
}

/*
const Componente = (props)=>{

  //Declaración
  //const state = React.useState();
  //useState regresa un array
  //const _state = state[0];
  //const setState = state[1];

  //Declaración por desestructuración
  const [state, setState] = useState();

  //Reglas de los Hooks
  //1.- Se deben declarar en el primer nivel del componente
  //2.- Los Hooks solo debe ser llamados desde funciones de React

  const [enteros, setEnteros] = useState(0);
  const [texto, setTexto] = useState("Welteach");
  const [booleanos, setBooleanos] = useState(true);

  // Un objeto JSON
  const [_json, setJson] = useState({
    enteros:0,
    texto:"Welteach",
    booleanos:true,
  });

  //Listas
  const [lista, setLista] = useState([
    {
      item:0
    },
    {
      item:1
    }
  ]);

  return (
    <div>
      <p>{_json.enteros}</p>
      <button onClick={()=>{
        setJson({
          ..._json,
          enteros: _json.enteros + 1
        });
      }}>Clic</button>
      <p>{_json.texto}</p>
      <input type="text" onChange={(e)=>{
        setJson({
          ..._json,
          texto: e.target.value
        });
      }} />
      <p>{_json.booleanos ? "True":"False"}</p>
      <input type="checkbox" onChange={(e)=>{
        setJson({
          ...JSON,
          booleanos: e.target.checked
        });
      }} />
      <br />
      <button onClick={()=>{
        let tLista = lista;
        tLista.push({
          item: lista.length
        });
        setLista(tLista);
        //console.log(tLista);
        setBooleanos(!booleanos);
      }}>Agregar</button>
      <ul>
        {
          lista.map((item, index)=>(
          <li key={index}>{item.item}</li>
          ))
        }
      </ul>
    </div>
  )

}
*/

/*
const Hijo = (props)=>{
  const [contador, setContador] = useState(0);
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  // Ejemplo donde no requiere saneamiento
  useEffect(()=>{
    console.log("componentDidMount");
    console.log("componentDidUpdate");

    // Posición
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        setLatitud(pos.coords.latitude.toFixed(0));
        setLongitud(pos.coords.longitude.toFixed(0));
      });
    }else{
      console.log("El navegador no soporta la geolocalizaión");
    }   
  }, [latitud, longitud]);

  // Ejemplo donde si requiere saneamiento
  useEffect(()=>{
    const intervalo = setInterval(() => {
      console.log("Intervalo...");
      setContador(contador + 1);
    }, 1000);


    return ()=>{
      console.log("componentWillUnmount");
      clearInterval(intervalo);
    }
  }, [contador]);

  return (
    <div>
      <p>{contador}</p>
      <p>{`Lat: ${latitud}, Lon: ${longitud}`}</p>
    </div>
  )
}

const Componente = (props)=>{
  const [verHijo, setVerHijo] = useState(true);

  return (
    <div className="padre">
      <h1>{"Hook useEffect con Welteach"}</h1>
      {
        verHijo ? (<Hijo />):("")
      }
      <br />
      <button onClick={()=>{
          setVerHijo(!verHijo);
      }}>{verHijo ? "Ocultar":"Ver"}</button>
    </div>
  )
}

const Context = React.createContext();

const HijoUno = (props)=>{
    const {mensaje, index, actualizarMensaje} = useContext(Context);

    return (
            <div className="hijo">
              <h1>Hijo 1</h1>
              {
                mensaje !== "" ? (
                  <p className={
                    index === 0 ? 'colorPadre':
                    index === 1 ? 'colorHijo1':
                    index === 2 ? 'colorHijo2':''
                  }>{
                    ((index === 0 ? 'Padre dice:':
                      index === 1 ? 'Hijo 1 dice:':
                      index === 2 ? 'Hijo 2 dice:':'')
                      + ' ' + mensaje)
                  }</p>
                ):("")
              }
              <textarea rows="5"
              onChange={(e)=>{
                actualizarMensaje(e,1);
              }} />
            </div>
          )
}

const HijoDos = (props)=>{
  const {mensaje, index, actualizarMensaje} = useContext(Context);

  return (
          <div className="hijo">
            <h1>Hijo 2</h1>
            {
              mensaje !== "" ? (
                <p className={
                  index === 0 ? 'colorPadre':
                  index === 1 ? 'colorHijo1':
                  index === 2 ? 'colorHijo2':''
                }>{
                  ((index === 0 ? 'Padre dice:':
                    index === 1 ? 'Hijo 1 dice:':
                    index === 2 ? 'Hijo 2 dice:':'')
                    + ' ' + mensaje)
                }</p>
              ):("")
            }
            <textarea rows="5"
              onChange={(e)=>{
                actualizarMensaje(e,2);
              }} />
          </div>
        )
}

class Padre extends React.Component{
  constructor(props){
    super(props)
    this.state={
      mensaje:"",
      index:0
    }
  }

  actualizarMensaje = (e, index)=>{
    const {value} = e.target;
    this.setState({
      ...this.state,
      mensaje:value,
      index
    })
  }

  render(){
    return (
      <Context.Provider value={{
        mensaje: this.state.mensaje,
        index: this.state.index,
        actualizarMensaje: this.actualizarMensaje
      }}>
        <div className="padre">
          <h1>Welteach - API Context</h1>
          {
            this.state.mensaje !== "" ? (
              <p className={
                this.state.index === 0 ? 'colorPadre':
                this.state.index === 1 ? 'colorHijo1':
                this.state.index === 2 ? 'colorHijo2':''
              }>{
                ((this.state.index === 0 ? 'Padre dice:':
                  this.state.index === 1 ? 'Hijo 1 dice:':
                  this.state.index === 2 ? 'Hijo 2 dice:':'')
                  + ' ' + this.state.mensaje)
              }</p>
            ):("")
          }
          <textarea 
          rows="5" 
          onChange={(e)=>{
            this.actualizarMensaje(e,0);
          }}/>
          <div className="hijos">
            <HijoUno />
            <HijoDos />
          </div>
        </div>
      </Context.Provider>
    )
  }
}

// Declaración
// useEffect(()=>{},[]);
*/

// Valores por default
/*
Componente.defaultProps = {
  texto:"Welteach",
  numero:10,
  correo:"francisco@welteach.com"
}*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
