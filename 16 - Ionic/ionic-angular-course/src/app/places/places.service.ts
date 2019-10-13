import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

// [
//   // tslint:disable-next-line: max-line-length
//   new Place('p1', 'Manhattan Mansion', 'In the heart of New York City.' , 'https://www.nyp.org/graphics/pps/banner-pps.jpg', 149.99, new Date('2019-01-01') , new Date('2019-12-31'), 'abc'),
//   // tslint:disable-next-line: max-line-length
//   new Place ('p2', 'La Amour Toujours', 'A romantic place in Paris', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60', 189.99, new Date('2019-01-01') , new Date('2019-12-31'), 'abc'),
//   // tslint:disable-next-line: max-line-length
//   new Place ('p3', 'The Foggy Palace', 'Not your average city trip', 'https://media1.tenor.com/images/e281f91966f360066b087d29f2c57080/tenor.gif?itemid=11424586', 99.99, new Date('2019-01-01') , new Date('2019-12-31'), 'abc')
// ]

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  // tslint:disable-next-line: variable-name
  private _places = new BehaviorSubject<Place[]>([]); 

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchPlaces() {
    return this.http.get<{[key: string]: PlaceData}>('https://ionic-angular-d1a75.firebaseio.com/offered-places.json').pipe(map(resData => {
      const places = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          // tslint:disable-next-line: max-line-length
          places.push(new Place(key, resData[key].title, resData[key].description, resData[key].imageUrl, resData[key].price, new Date(resData[key].availableFrom), new Date(resData[key].availableTo), resData[key].userId));
        }
      }
      // return [];
      return places;
    }),
    tap(places => {
      this._places.next(places);
    })
    );
  }
  
  getPlace(id: string) {
    return this.http.get<PlaceData>
    (`https://ionic-angular-d1a75.firebaseio.com/offered-places/${id}.json`
    ).pipe(map(placeData => {
      return new Place(id, placeData.title , placeData.description ,
         placeData.imageUrl, placeData.price, new Date(placeData.availableFrom), new Date(placeData.availableTo), placeData.userId);
    })
    );
  }

  addPlace(title: string , description: string, price: number, dateFrom: Date, dateTo: Date) {
    let generatedId: string;
    // tslint:disable-next-line: max-line-length
    const newPlace = new Place(Math.random().toString(), title , description, 'https://www.nyp.org/graphics/pps/banner-pps.jpg', price , dateFrom, dateTo, this.authService.userId );
    
    // tslint:disable-next-line: max-line-length
    return this.http.post<{name: string}>('https://ionic-angular-d1a75.firebaseio.com/offered-places.json', {...newPlace, id: null}).pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.places;
      }),
      take(1),
      tap((places) => {
        newPlace.id = generatedId;
        this._places.next(places.concat(newPlace));
      })
    );

    // take 1 object and cancel the susbsription
    // return this.places.pipe(take(1), delay(1000) , tap((places) => {
    //     this._places.next(places.concat(newPlace));
    // }));
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if ( !places || places.length <= 0 ) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://ionic-angular-d1a75.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}
