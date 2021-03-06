import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveComponent } from './leave.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ViserModule } from 'viser-ng';
import { ConsumptionComponent } from './consumption/consumption.component';
@NgModule({
  declarations: [LeaveComponent, ConsumptionComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    ViserModule,
    RouterModule.forChild([{
      path: '',
      component: LeaveComponent
    }])
  ],
  entryComponents: [ConsumptionComponent]

})
export class LeaveModule { }
