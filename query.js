var Q= {
    engineType : 'select enginetype from bike group by enginetype',
    availableBiketypes : 'select count(enginetype) as count, enginetype from bike b where enginetype in ( select enginetype from bike b where b.available=1 ) group by enginetype order by count(enginetype) desc ;'
    
}
module.exports = {Q} 