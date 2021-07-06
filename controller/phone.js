const client = require('../db_connection');
module.exports.getAllPhones = (req, res)=>{
    sql="SELECT * from phone";
    client.query(sql, function(err, rows){
        if(!err){
            if(rows.length>0)
                res.status(200).json({
                    err:false,
                    rows:rows
                })
            else
                res.status(404).json({
                    err:false,
                    rows:[],
                    message:"Empty stock",
                })        
        }

        else
        res.status(500).json({
            err:true,
            message:err.sqlMessage
        });
    } )
} 

module.exports.getOnePhone = (req, res)=>{
    const {id} = req.params;
    sql="SELECT * from phone where id = ?";
    client.query(sql, id, function(err, rows){
        if(!err){
            if(rows.length>0)
                res.status(200).json({
                    err:false,
                    rows:rows
                })
            else
                res.status(404).json({
                    err:false,
                    rows:[],
                    message:"Phone not found",
                })        
        }

        else
        res.status(500).json({
            err:true,
            message:err.sqlMessage
        });
    } )
} 

module.exports.addPhone = (req, res)=>{
    const {title,img,price,company,info,qte_stock} = req.body;
    
    sql="INSERT INTO PHONE (title,img,price,company,info,qte_stock) VALUES ?";
    const values=[
        [title,img,price,company,info,qte_stock]
    ]
    client.query(sql, [values], (err, rows)=>{
        if(!err){
            if(rows.affectedRows>0)
                    res.status(200).json({
                        err:false,
                        rows:rows.affectedRows,
                    })
                else
                    res.status(404).json({
                        err:true,
                        rows:[],
                        message:"GOOD REQUEST BUT FAILED TO STORE DATA IN PHONE TABLE",
                    })        
            }
               
            else
                res.status(500).json({
                    err:true,
                    message:err.sqlMessage,
                });
        })
} 

module.exports.deletePhone= (req, res)=>{
   sql="Delete from phone where id=?";
   const {id} = req.params;
   client.query(sql,id,(err)=>{
       if(!err){
        res.status(200).json({
            err:false,
            rows:"Phone deleted ",
        })
       }
       else{
            res.status(500).json({
                err:true,
                message:err.sqlMessage,
            });
       }
   })
}