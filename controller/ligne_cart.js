const client = require('../db_connection');
module.exports.getAllLigneCart = (req, res)=>{
    sql="SELECT * from ligne_cart";
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
                    message:"NO LIGNE_CART AT THIS MOMENT",
                })        
        }

        else
        res.status(500).json({
            err:true,
            message:err.sqlMessage
        });
    } )
} 

module.exports.getLigne_Cart = (req, res)=>{
    const {id} = req.params;
    //sql="SELECT * from cart c join client cl on c.id_client = cl.id where c.id_client = ?";
    sql="SELECT * from cart c join ligne_cart lc join phone p on c.id = lc.id_cart and p.id=lc.id_phone where c.id=?";
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

module.exports.addLigne_Cart = (req, res)=>{
    const {id_phone,id_cart,total_prix, qte} = req.body;
    
    sql="INSERT INTO ligne_cart (id_phone,id_cart,total_prix, qte) VALUES ?";
    const values=[
        [id_phone,id_cart,total_prix, qte]
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
                        message:"GOOD REQUEST BUT FAILED TO STORE DATA IN CART TABLE",
                    })        
            }
               
            else
                res.status(500).json({
                    err:true,
                    message:err.sqlMessage,
                });
        })
} 

module.exports.deleteLigne_Cart= (req, res)=>{
   sql="Delete from ligne_cart where id_cart=?";
   const {id} = req.params;
   client.query(sql,id,(err)=>{
       if(!err){
        res.status(200).json({
            err:false,
            rows:"ligne_cart deleted ",
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