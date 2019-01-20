

if(Meteor.isServer){
	//Meteor.startup(function(){

		 var T = new Twit({
               consumer_key:         'e6wcugIgcqWfzAY5HtHXwlHXK', // API key
               consumer_secret:      '0D71g5xTp3FlaLVORk7ySbarFDVeUXElNvsdpPGFtXIZu4WIaK', // API secret
               access_token:         '2510560105-tnFSdlZsmG21QQUH6xzCjtzDS40D453SWFKKIZw', 
               access_token_secret:  'z4RF2VIQ7lj2142SgNMm3HZ233fL1HbrBcYx1QQbq071j'
        });



     var stream = T.stream('statuses/filter', {track:'#rapidresponse'});

        //streaming live tweets
     	stream.on('tweet', Meteor.bindEnvironment(function (tweet,err) {
		  if(err){
		  	console.log(err);
		  }else{

		   //Get id,text,name
		   var id=tweet.id;
		   var text=tweet.text;
		   var name=tweet.user.name;
           var latitude="";
           var longitude="";
           //Getting geo coordinates
           if(tweet.geo!=null){    
		         var coordinates=tweet.geo.coordinates;
		         //var List=coordinates.split(',');
		         
		         console.log("coordinates:"+coordinates);
		   }

		  console.log('id:'+id+'text:'+text+'name:'+name); 

           //Pattern match for mobile number
		   var match=text.match(/[0-9]{10}/);
		   
		   if(match!=null){
		   	        var number=match[0];
		            console.log(number);
                

                    var index=match.index+10;
                    //Getting index for address
                    var address=text.slice(index);
                    if(address!="")
                      	  console.log("address:"+address);
                 }
                else{
                	var address=text.slice(14);
                	if(address!=""){
                		console.log("address:"+address);
		              }
                }
                //Getting geo location from tweeted place
                if(address!=""){
                   var geo = new GeoCoder();
                   var result = geo.geocode(address);
                  latitude=result[0].latitude;
                  longitude=result[0].longitude;
                         console.log(latitude);
                   }
              var distressCallCoords = {lat:latitude , lng:longitude};       

    
     
        Meteor.call('addDistressSignal', {
      "coords": distressCallCoords,
      "helped": false,
      "phone": number,
      "fullName": name,
      "source":"twitter"
    });
                      
		  }
		}))

	//	});
}