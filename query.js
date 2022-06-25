var Q= {
    engineType : 'select enginetype from bike group by enginetype',
    availableBiketypes : 'select count(enginetype) as count, enginetype from bike b where enginetype in ( select enginetype from bike b where b.available=1 ) group by enginetype order by count(enginetype) desc ;',
    allbikes : "select * from bike",
    getprice : 'SELECT * FROM mydb.price where bike_id = ',
    checkuser : 'select * from customer where ',
    newuser : '',
    getmaxidcutomer : "select max(customer.idcustomer) as maxid from customer",
    getratings : "select name ,age, rate, suggestion from customer  inner join rating on customer.idcustomer = rating.customer_id",
    avgrating : "select avg(rate) as avg from rating",
    topbikes : "select bike.name,bike.enginetype , bike.modelname as model , outp.id_bike as id from bike inner join (select (count(booking.id_bike)) , booking.id_bike from booking group by booking.id_bike order by (count(booking.id_bike)) desc limit 5) as outp on outp.id_bike = bike.idbike;",
    revenuebtw: "SELECT SUM(price) FROM booking as bWHERE b.bookingtime BETWEEN '2021-06-03' AND '2021-06-09';",
    companywithbikes :"use mydb;SELECT DISTINCT companynameFROM bike",
    searchbikewithprice: "Select * from customer,booking where id_bike in  (Select idbike from bike,price where modelname='hunk' and priceday>700);",
    ratinglessthanavg: "select r.suggestion , r.rate from rating as r where r.rate < (SELECT AVG(rate) FROM rating);",
    
}   
module.exports = {Q} 