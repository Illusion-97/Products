import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export abstract class AbstractCRUDService<E extends {id: unknown}> {
    protected abstract END_POINT : string;
    protected http: HttpClient = inject(HttpClient)
    
  
    all() : Observable<E[]> {
      return this.http.get<E[]>(this.END_POINT)
    }
  
    byId(id: any) : Observable<E> {
      return this.http.get<E>(this.END_POINT + "/" + id)
    }
  
    save(entity: E) : Observable<E> {
      return this.http.post<E>(this.END_POINT, entity)
    }
  
    update(entity: E) : Observable<E>  {
      return this.http.put<E>(this.END_POINT + "/" + entity.id, entity)
    }
  
    delete(id: unknown) : Observable<E>  {
      return this.http.delete<E>(this.END_POINT + "/" + id)
    }
}
