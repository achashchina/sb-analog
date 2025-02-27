import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'async-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
})
export default class AdminComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.addPost();
  }

  private addPost() {
    console.log(55);
    return this.httpClient.post('/api/v1/add-post', {
      date: new Date(),
      iframe: 'test',
    });
  }
}
