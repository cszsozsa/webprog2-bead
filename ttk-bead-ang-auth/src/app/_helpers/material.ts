import { NgModule } from '@angular/core';
// import { MatButtonModule } from '@angular/material'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [MatToolbarModule, MatTableModule, MatButtonModule],
    exports: [MatToolbarModule, MatTableModule, MatButtonModule]
})

export class MaterialModule {}