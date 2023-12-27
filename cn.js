const config = {
	user: 'iEx',
	password: 'iEx',
	server: 'DESKTOP-E0KG096\\SQL17',
	database: 'VENTAS',
	pool: {	max: 100,	min: 0,	idleTimeoutMillis: 30000}
};



let execute = {
	Query : (res,sqlqry)=>{	
		const sql = require('mssql');

		try {
		  const pool1 = new sql.ConnectionPool(config, err => {
			new sql.Request(pool1)
			.query(sqlqry, (err, result) => {
				if(err){
					console.log(err.message);
					res.send('error');
				}else{
					res.send(result);
				}					
			})
			sql.close();  
		  })
		  pool1.on('error', err => {
				res.send('error');
			  console.log('error sql = ' + err);
			  sql.close();
		  })
		} catch (error) {
			console.log(error);
		  res.send('error');   
		  sql.close();
		}
	}
}

module.exports = execute;

