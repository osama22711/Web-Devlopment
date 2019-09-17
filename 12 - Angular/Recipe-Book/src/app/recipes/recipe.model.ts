// This is a class the created class will be object remember that especially when u are injecting it into HTML
export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;

    constructor(name:string,desc:string,imagePath:string){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}