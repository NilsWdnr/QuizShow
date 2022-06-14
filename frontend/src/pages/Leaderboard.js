import { isEmpty } from "lodash";
import React, {useState, useEffect, useContext } from "react";

import { UserContext } from "../context/UserProvider";
import User from "../mapping/User";

import getService from "../services/getService";
import LeaderboardFriend from "../components/LeaderboardFriend";

export default function Leaderboard(){

    const {userState} = useContext(UserContext);

    const [highscore, setHighscore] = useState(0);
    const [friends, setFriends] = useState([]);

    useEffect(() => {

        const getHighscore = () => {

            getService("user","getHighscore",userState.id)
                .then(res=>setHighscore(res));
    
        }
    
        const getFriends = () => {
    
            getService("user","getFriends",userState.id)
                .then(res => res.map(e => new User(e)))
                .then(res => setFriends(res))
    
        }

        getHighscore();
        getFriends();
    }, [userState])




    const FriendsList = () => {

        let self = {...userState};

        self.highscore = highscore;

        let friendsRanked = [...friends,self];

        friendsRanked.sort(compareHighscore);

        friendsRanked = calculateRank(friendsRanked);

        if(isEmpty(friends)){
            return (
                <p className="text-center py-4">
                Sieht als als hättest du noch keine Freunde...
                </p>
            )
        } else {
            return (
                <>
                {friendsRanked.map(({friend,rank})=>{
                    let self = false;
                    if(friend.username===userState.username){
                        self = true;
                    }
                    return <LeaderboardFriend key={friend.id} user={friend} rank={rank} self={self}/>
                })}
                </>
            )
        }
    }

    const compareHighscore = (value1, value2) => {
        
        if ( value1.highscore < value2.highscore ){
            return 1;
          }
          if ( value1.highscore > value2.highscore ){
            return -1;
          }
          return 0;

    }

    const calculateRank = (friends) => {

        if(isEmpty(friends)) return friends;

        const friendsRanked = [{friend: friends[0],
                                rank: 1
                                }];



        for(let i=1;i<friends.length;i++){

            const rankedFriend = {
                friend: friends[i],
                rank: friendsRanked[i-1].rank
            }

            if(friends[i].highscore<friendsRanked[i-1].friend.highscore){
                rankedFriend.rank++;
            }

            friendsRanked.push(rankedFriend);
        }

        return friendsRanked;

    }

    return(
        <main className="pb-5">
            <div className='container my-5' id="leaderboard">
                <h2 className='text-center pt-5'>Persönlicher Highscore</h2>
                <p className='personal-highscore text-center'>{highscore}</p>

                <h2 className='text-center pt-5 pb-3'>Deine Freunde</h2>
                <div className="friends-leaderboard">
                    <FriendsList />
                </div>
            </div>
        </main>
    )
} 