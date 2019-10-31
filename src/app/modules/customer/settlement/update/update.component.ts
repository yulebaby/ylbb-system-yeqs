import { HttpService } from 'src/app/ng-relax/services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DrawerSave } from 'src/app/ng-relax/decorators/drawer/save.decorator.res';
import { DrawerClose } from 'src/app/ng-relax/decorators/drawer/close.decorator';
import { NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {

  @Input() id: number;

  formGroup: FormGroup;

  communityList: any = [];
  sourceList: any = [];
  collectorList: any = [];
  teachList: any = [];
  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private drawerRef: NzDrawerRef
  ) {
    /* ----------------------- 获取该门店下所有小区 ----------------------- */
    this.http.post('/member/communityList', {}, false).then(res => {
      this.communityList = res.result;
    });
    this.http.post('/common/recommenderList', {}, false).then(res => {
      this.teachList = res.result;
    });  
    this.http.post('/management/selectSource', {}, false).then(res => {
      this.sourceList = res.result;
      console.log(this.sourceList);
    });
    this.http.post('/retrunVisit/getEmployeeList', {}, false).then(res => {
      this.collectorList = res.result;
    });
  }

  ngOnInit() {
    /* ------------------------- 初始化表单模型 ------------------------- */
    this.formGroup = this.fb.group({
      id: [this.id],
      name: [, [Validators.required]],
      nick: [],
      sex: [, [Validators.required]],
      birthday: [, [Validators.required]],
      parentName: [, [Validators.required]],
      fixPhone: [],
      mobilePhone: [, [Validators.required]],
      communityId: [, [Validators.required]],
      illHistory: [, [Validators.required]],
      allergieHistory: [, [Validators.required]],
      babyType: [, [Validators.required]],
      babyNumber: [, [Validators.required]],
      customerSourceId: [, [Validators.required]],
      collectorId:[, [Validators.required]],
      recommendedId: [],
      comment: []
    });
    /* -------------------------- 用户信息回显 -------------------------- */
    if (this.id) {
      this.http.post('/member/queryMemberById', { id: this.id }, false).then(res => {
        this.formGroup.patchValue(res.result);
      })
    }
  }

  @DrawerClose() close: () => void;
  saveLoading: boolean;
  save(){
    this.DrawerSaves('/member/modifyMember');
  }
   DrawerSaves(requestPath) {
        if (this.formGroup.invalid) {
          for (let i in this.formGroup.controls) {
            this.formGroup.controls[i].markAsDirty();
            this.formGroup.controls[i].updateValueAndValidity();
          }
        } else {
          this.saveLoading = true;
          let params = JSON.parse(JSON.stringify(this.formGroup.value));
          Object.keys(params).map(res => {
            // if (new Date(`${params[res]}`).toString() !== 'Invalid Date') {
            //  params[res] = formatTime(new Date(params[res]));
            // }
          });
          this.http.post(requestPath, {
            paramJson: JSON.stringify(params)
          }, true).then(res => {
            this.saveLoading = false;
            this.drawerRef.close(res);
          }).catch(err => this.saveLoading = false);
        }
      
    
  }

  /* ------------ 宝宝生日禁止选择今天以后的日期 ------------ */
  _disabledDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }


}