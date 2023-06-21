import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // user the router to navigate to specific url
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // search products based on its name
  searchProduct(searchTerm: string) {

    console.log(`search term = ${searchTerm}`);

    // navigate to `/search/${searchTerm}`
    this.router.navigateByUrl(`/search/${searchTerm}`);
  }
}
