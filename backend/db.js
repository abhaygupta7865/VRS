import pg from 'pg'

const client= new pg.Client({
    host:'localhost',
    user: 'postgres',
    password: 'Aa@12345678',
    port: 5432,
    database:'VMS'
})

client.connect((err) => {
    if(err){
        console.error('connection error',err.stack)
    }
    else {
        console.log('connected')
    }
})
client.query('select * from users',(err,res)=>{
    if(!err){
        console.log(res.rows)
    }
    else{
        console.log(err.message)
    }
    client.end
})

export default client;