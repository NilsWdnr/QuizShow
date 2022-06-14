export default class User {
  constructor(json){
    this.id = Number(json.id);
    this.username = json.username;
    this.highscore = Number(json.highscore);
    this.picture = `https://avatars.dicebear.com/api/human/${this.id}.svg?background=%23E9E9E9`;
    this.ep = Number(json.ep);
  }

}