import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo = '';

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getDataRoute().subscribe(event => { 
      console.log(event); 

      this.titulo = event.titulo; 
      this.title.setTitle(this.titulo); 
      
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      }

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute(): Observable<Data> {
    return this.router.events.pipe(
      filter(e => e instanceof ActivationEnd),
      filter((activated: ActivationEnd) => activated.snapshot.firstChild == null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }
}
