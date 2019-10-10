const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser) {
        return { error: 'Username is taken' }
    }

    const user = { id, name, room}
    users.push(user);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

const getUsers = () =>{
    
}

//const getUser = (id) => {
    //users.find((user) => user.id === id);
    //console.log("users",users)
//    return users[0]
//}

const getUser = (id) => users.find((user) => user.id === id);

    //const u = users.find((user) => user.id === id);
    //console.log("sd",u)
    //return u 
    
//}


//const getUsersInRoom = (room) => {
//    users.filter((user) => user.room === room);
//}
const getUsersInRoom = (room) => { return(users.filter((user) => user.room === room)) } ;



module.exports = { addUser, removeUser, getUser, getUsers, getUsersInRoom}