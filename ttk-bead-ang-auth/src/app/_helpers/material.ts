import { NgModule } from '@angular/core';
// import { MatButtonModule } from '@angular/material'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [MatToolbarModule, MatTableModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule],
    exports: [MatToolbarModule, MatTableModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule]
})

export class MaterialModule {}