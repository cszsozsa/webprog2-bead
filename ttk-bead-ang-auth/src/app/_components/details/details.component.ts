import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatService } from 'src/app/_services/cat.service';
import { Cat } from '../../_models/cat';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {  
  cat: Cat;
  catForm: FormGroup;
  catId: number;
  onlyCat: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private cS: CatService
  ) { }

  ngOnInit() {
    this.catForm = this.fb.group({
      id: this.catId,
      name: ['', Validators.required],
      food: ['', Validators.required],
      img: ['', Validators.required],
      task: 'update'
    })
    this.getCatByIdFromService();
  }

  getCatByIdFromService() {
    // segédváltozó, URL-ből kiveszi az id-t
    const id = +this.route.snapshot.paramMap.get('id');
    this.catId = id;
    
    this.cS.getCatByIdFromDatabase({ id: id, task: 'get' })
      .subscribe(catById => { 
        this.cat = catById;
        console.log('A kapott cica: ' + this.cat.name);
        this.catForm.patchValue({
          id: this.catId,
          name: this.cat.name,
          food: this.cat.food,
          img: this.cat.img
        })
      })
  }

  goBack() {
    this.location.back();
  }

  updateCatToServer() {
    this.cS.updateCatByIdToDatabase(this.catForm.value).subscribe( data => console.log(data) );
    this.location.back();
  }
}
