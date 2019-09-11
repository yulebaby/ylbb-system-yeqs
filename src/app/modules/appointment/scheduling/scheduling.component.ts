import { NzModalService } from 'ng-zorro-antd';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.less']
})
export class SchedulingComponent implements OnInit {
  dayLoading = true;
  dayList: any = {
    list: [],
    date: []
  };
  baseFormGroup: FormGroup;
  showDrawer: boolean = false;
  saveLoading: boolean = false;
  scheduleStatus;

  constructor(
    private http: HttpService,
    private fb: FormBuilder = new FormBuilder(),
    private modal: NzModalService
  ) {
    this.getData();
  }

  getData() {
    this.dayLoading = true;
    this.http.post('/schedulingWaterConfig/list').then(res => {
      this.scheduleStatus = res.result.teacherScheduleStatus;
      this.dayList = res.result;
      this.dayLoading = false;
    });
  }
  setHoliday(date){
    this.dayLoading = true;
    this.http.post('/schedulingWaterConfig/setHoliday', { date },true).then(res => {
      if(res.code == 1000){
        this.getData();
      }
    });
  }
  nzOnCancels(){
  
  }
  ngOnInit() {
    this.baseFormGroup = this.fb.group({
      id: [],
      showerCount: [ ,[Validators.required]],
      receptionCount : [ ,[Validators.required]],
      restDay: [ ,[Validators.required]],
    });
  }
  
  showSave(){
    this.showDrawer = true;
    this.http.post('/schedulingWaterConfig/getDucators', {}, false).then(res=>{
      this.baseFormGroup.patchValue(res.result);
    });
  }

  save() {
    if (this.baseFormGroup.invalid) {
      for (let i in this.baseFormGroup.controls) {
        this.baseFormGroup.controls[i].markAsDirty();
        this.baseFormGroup.controls[i].updateValueAndValidity();
      }
    }else{
      this.saveLoading = true;
    this.http.post('/schedulingWaterConfig/modifyDucators', { paramJson: JSON.stringify(this.baseFormGroup.value)}, true).then(res=>{
      this.saveLoading = false;
        this.getData();
        this.showDrawer = false;
    });

    }
  }

  resetList(){
    
    this.http.post('/schedulingWaterConfig/restart', {  }, true).then(res => this.getData());
  }

  @ViewChild('tplContent') tplContent;
  getHourLoading: boolean;
  teacherHourList: any[] = [];
  change(data, dutyDay) {
    if (this.scheduleStatus == 0) {
      let _this_ = this;
      const modal = this.modal.create({
        nzTitle: '时刻信息',
        nzContent: this.tplContent,
        nzMaskClosable: false,
        nzClosable: false,
        nzFooter: [
          {
            label: '取消',
            onClick: () => modal.close()
          },
          {
            label: '确定',
            type: 'primary',
            loading: false,
            onClick() {
              this.loading = true;
              let teacherDayHours = [];
              _this_.teacherHourList.map(res => res.checked && teacherDayHours.push(res.value));
              _this_.http.post('/teacherDayConfig/saveHour', {
                paramJson: JSON.stringify({
                  teacherId: data.value.teacherId,
                  dutyDay,
                  teacherDayHours
                })
              }, true).then(res => {
                modal.close();
                _this_.getData();
              }).catch(err => this.loading = false);
            }
          }
        ]
      });
      this.getHourLoading = true;
      this.http.post('/teacherDayConfig/editTeacherHour', {
        paramJson: JSON.stringify({
          teacherId: data.value.teacherId,
          dutyDay
        })
      }, false).then(res => {
        this.getHourLoading = false;
        let teacherHourList = [];
        res.result.dates.map(item => {
          teacherHourList.push({
            label: item,
            value: item,
            checked: res.result.teacherReserveHours.indexOf(item) > -1
          })
        });
        this.teacherHourList = teacherHourList;
        this.teacherHourChecked();
      })
    }
  }

  allChecked: boolean;
  indeterminate: boolean;
  teacherHourChecked() {
    if (this.teacherHourList.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.teacherHourList.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.teacherHourList.forEach(item => item.checked = true);
    } else {
      this.teacherHourList.forEach(item => item.checked = false);
    }
  }

}
