var main = new Vue({

    el: '#main',
    data: {
        games: [],

        allGames: [],
        allGames1: [],
        filteredGames: [],
        posts:[],
        table: false,
        location: false,
        calender: false,
        logIn: false,
        teams: false,
        logo: true,
        video: true,
        filterTeam: false,
        chatPage: false,
      myUserName:"",
//        anotherUser:"",
    },
    
    created: function () {
        this.dataServer();
    },
    methods: {
        dataServer: function () {
            {
                var url = fetch("https://api.myjson.com/bins/d3i8k", {
                        method: "GET",
                    })
                    .then(function (response) {
                        if (response.ok)
                            return response.json()
                    })
                    .then(function (json) {
                        data = json;
                        main.games = data.games;
                        main.getSixteenGames();
                        main.getButton();
                        main.getPosts();
                        main.loggedInPage();

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        },

        getSixteenGames: function () {
            var games = main.games;
            var allGames = main.allGames;
            for (let i = 0; i < 17; i++) {
                allGames.push(games[i]);
            }
        },

        getButton: function () {
            var games = main.games;
            var allGames1 = main.allGames1;

            for (let i = 20; i < 26; i++) {
                allGames1.push(games[i]);
            }
        },

        gamesForOneTeam: function (team) {
            var games = main.games;
            var array = [];
            for (var i = 0; i < 17; i++) {
                if (games[i].Team.includes(team)) {
                    array.push(games[i])
                }
            }

            main.filteredGames = array;
            this.table = false
            this.location = false
            this.calender = false
            this.logIn = false
            this.logo = false
            this.teams = false
            this.video = false
            this.filterTeam = true
            this.chatPage = false

        },

        tablePage: function () {

            this.table = true
            this.location = false
            this.calender = false
            this.logIn = false
            this.logo = false
            this.teams = false
            this.video = false
            this.filterTeam = false
            this.chatPage = false
        },

        locationPage: function () {

            this.table = false
            this.location = true
            this.calender = false
            this.logIn = false
            this.logo = false
            this.teams = false
            this.video = false
            this.filterTeam = false
            this.chatPage = false
        },

        calenderPage: function () {

            this.table = false
            this.location = false
            this.calender = true
            this.logIn = false
            this.logo = false
            this.teams = false
            this.video = false
            this.filterTeam = false
            this.chatPage = false
        },

        loginPage: function () {

            this.table = false
            this.location = false
            this.calender = false
            this.logIn = true
            this.logo = false
            this.teams = false
            this.video = false
            this.filterTeam = false
            this.chatPage = false
        },
        homePage: function () {

            this.table = false
            this.location = false
            this.calender = false
            this.logIn = false
            this.logo = true
            this.teams = false
            this.video = true
            this.filterTeam = false
            this.chatPage = false
        },
        teamPage: function () {
            this.table = false
            this.location = false
            this.calender = false
            this.logIn = false
            this.logo = false
            this.teams = true
            this.video = false
            this.filterTeam = false
            this.chatPage = false

        },

        myChatPage: function () {
            this.table = false
            this.location = false
            this.calender = false
            this.logIn = false
            this.logo = false
            this.teams = false
            this.video = false
            this.filterTeam = false
            this.chatPage = true

        },
        loggedInPage: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            var userName = firebase.auth().currentUser.displayName;
            if (this.myUserName == userName){
                
            }
            else{
            firebase.auth().signInWithPopup(provider)
                .then(function () {
                                console.log("ffffff")

                    main.myChatPage();
                })

        }},
        logOutPage: function () {
           firebase.auth().signOut().then(function () {
               alert("You have succesfylly Log Out");
               
           }, function (error) {
               console.error('Sign Out Error', error);
                
           });
       },
        writeNewPost: function () {
            var text = document.getElementById("textInput").value;
            var userName = firebase.auth().currentUser.displayName;
//            this.myUserName = userName;
            var imageUser = firebase.auth().currentUser.photoURL;

            var posts = {
                name: userName,
                body: text,
                img: imageUser
            };
            var newPostKey = firebase.database().ref().child('ubiqum').push().key;
            var updates = {};
            updates[newPostKey] = posts;
            return firebase.database().ref('ubiqum').update(updates);
            main.getPosts();

        },

        getPosts: function () {
            firebase.database().ref('ubiqum').on('value', function (data) {
                var posts = document.getElementById("posts");
                var userName = firebase.auth().currentUser.displayName;
                posts.innerHTML = "";
                var messages = data.val();
                for (var key in messages) {
                    var element = messages[key];
                    
                    if (element.name == userName) {
                        element['user'] = 'is-user';
                       
                    } else {
                        element['user'] = 'is-other';
                      
                    }
                    setTimeout(function(){
               $("#posts").animate({
                   scrollTop: $("#posts").prop("scrollHeight")
               }, 500);});
                    main.posts.push(element);
                    
                }
            })
        },
    }
})
