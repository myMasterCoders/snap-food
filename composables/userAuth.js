

export function authUsers(){
    const user=useState('users',()=>null)
    return{
        user
    }
}