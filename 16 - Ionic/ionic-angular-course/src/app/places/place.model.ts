
export class Place {
    // tslint:disable-next-line: max-line-length
    constructor(public id: string , public title: string , public description: string, public imageUrl: string, public price: number , public availableFrom: Date, public availableTo: Date, public userId: string) {
    }
}