import React, { Component } from 'react';
import List from './List';
class Body extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            activities:[{
                id:0,
                name:"Menggambar",
                desc:"Menggambar fanart klee dengan pensil dan sketchbook"
            },
            {
                id:1,
                name:"Ngoding",
                desc:"Mengerjakan tugas todo list menggunakan react js dari progate"
            }
        ],
            index:2,
            name:"",
            desc:"",
            setUpdate:[{
                isUpdate:false,
                id:null
            }],
            hasDescError:false,
            hasNameError:false,
        };
        
    }
    submitForm(e){
       e.preventDefault();
       if (this.state.name !== "" && this.state.desc !== "") {
        let dataActivity = this.state.activities;
            if (this.state.setUpdate.isUpdate) {
                dataActivity.forEach(data => {
                    if (data.id === this.state.setUpdate.id) {
                        data.name = this.state.name;
                        data.desc = this.state.desc;
                    }
                });
                this.setState({
                    activities: dataActivity,
                    setUpdate:{
                        isUpdate: false,
                        id:null
                    },
                    name:"",
                    desc:"",
                });
            }else{
                dataActivity.push({
                    name: this.state.name,
                    desc: this.state.desc,
                    id: this.state.index+1
                });
                this.setState({
                    name:"",
                    desc:"",
                    activities:dataActivity,
                    index:this.state.index+1
                });
            }
       
        }
        
        console.log(this.state.activities);
    }
    
    handleDelete = (id,event)=>{
        event.preventDefault();
        let activities =this.state.activities;
        let dataFilter = activities.filter(activity=>{
            return activity.id !== id
        });
        this.setState({
            activities: dataFilter
        });
        

    }
    handleUpdate = (id,event)=>{
        event.preventDefault();
        let activities =this.state.activities;

        let dataFound = activities.find((activity)=> { return activity.id === id});
        this.setState({
            name: dataFound.name,
            desc: dataFound.desc,
            setUpdate:{
                id: dataFound.id,
                isUpdate:true
            }
        });

    }

    handleChangeName(value){
        this.setState({name:value});
        const isEmpty = value === '';
        this.setState({hasNameError:isEmpty});
        
    }
    handleChangeDesc(value){
        this.setState({desc:value});
        const isEmpty = value === '';
        this.setState({hasDescError:isEmpty});
    }
    
    render() {
        let handleErrorName;
        let handleErrorDesc;
        if(this.state.hasNameError){
            handleErrorName=(
                <small>Nama kegiatan wajib diisi</small>
            );
        }
        if (this.state.hasDescError) {
            handleErrorDesc=(
                <small>Deskripsi kegiatan wajib diisi</small>
            );
        }
        return (
            
            <div >
                <div className='container'>
                <form onSubmit={(event)=>{this.submitForm(event)}}>
                <label>Nama Kegiatan</label>
                <input type="text" name="name" value={this.state.name} onChange={(event)=>{this.handleChangeName(event.target.value,event)}} placeholder='Masukan nama kegiatan..'  className='inputText'/>
                {handleErrorName}
                <br/>

                <label>Deskripsi</label>
                <textarea name="desc" value={this.state.desc} onChange={(event)=>{this.handleChangeDesc(event.target.value,event)}} placeholder='Masukan deskripsi kegiatan..'  className='inputTextArea' cols="40" rows="5"/>
                {handleErrorDesc}
                <br/>
                <input type="submit" value="Submit" className='button' />
                </form>

                </div>

                <List handleUpdate={this.handleUpdate} handleDelete={this.handleDelete} dataLists={this.state.activities}/>
            </div>
        );

    }
}

export default Body;
