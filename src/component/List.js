import React, { Component } from 'react';
class List extends Component {
    render() {
        return (
            <div className='container-card'>
                <h3>Daftar Kegiatan</h3>
                    {this.props.dataLists.map((list)=>{
                        return ( 
                        <div className="list-card">
                            <h4  key={list.id}><input  type="checkbox" className='checkbox' /> {list.name} </h4>
                            <p>{list.desc}</p>
                            
                            <a href='#' className='btn btn-info' onClick={(event)=>{this.props.handleUpdate(list.id,event)}}> Edit</a>
                            <a href='#' className='btn btn-danger' onClick={(event)=>{this.props.handleDelete(list.id,event)}}> Hapus</a>
                            
                        </div>
                        
                        )
                    })}
                   
            </div>
        );
    }
}

export default List;
