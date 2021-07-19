const rp = require('request-promise');
const BASE_URL = 'http://localhost:8000';

class UnqfyClient {
    
    constructor() {
    }
        
     getArtist(artistId) {
        let options = {

            uri: BASE_URL + `/artists/${artistId}`,
            json: true,

        }

        return  rp.get(
            options)
            .then( res=>{
                console.log(res);
                return res }
            ).catch(err=>
            console.log(err)
        )

    }




}

module.exports =  UnqfyClient ;