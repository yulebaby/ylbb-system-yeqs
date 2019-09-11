
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from './../../../ng-relax/services/http.service';
import { QueryComponent } from './../../../ng-relax/components/query/query.component';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { QueryNode } from 'src/app/ng-relax/components/query/query.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements AfterViewInit {

  @ViewChild('eaQuery') eaQuery: QueryComponent

  queryNode: QueryNode[] = [
    {
      label: '时间',
      type: 'datepicker',
      key: 'createTime'
    },
    {
      label: '教练',
      type: 'select',
      key: 'employeeId',
      optionKey: { label: 'name', value: 'id' },
      optionsUrl: '/member/getStoreTeachers'
    },

    {
      label: '事件类型',
      type: 'select',
      key: 'type',
      options: [{ name: '身高体重', id: 0 }, { name: '视频', id: 1 },{ name: '图片', id: 2 },{ name: '服务记录', id: 3 },{ name: '月报', id: 4 }],
    }
  ]

  loading: boolean;
  pageNum : number = 1;
  totalPage: number;
  dataSet: any[] = [];

  checkAuth: number;
  selectValue :number;
  constructor(
    private http: HttpService,
    private message: NzMessageService
  ) {
    this.query();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // this.eaQuery._queryForm.get('classId').valueChanges.subscribe(classId => {
    //   if (classId) {
    //     this.http.post('/message/listStuByClassId', { classId }, false).then(res => {
    //       this.eaQuery.node.map(control => {
    //         control.key == 'studentId' && (control.options = res.data.list);
    //       })
    //     })
    //   } else {
    //     this.eaQuery.node.map(control => control.key == 'studentId' && (control.options = []));
    //   }
    //   this.eaQuery._queryForm.patchValue({ studentId: null });
    // });
  }



  queryParams: any = {};
  loadData(pi: number): void {
    this.pageNum = pi;
    this.query();
  }
  querySubmit(params) {
    this.queryParams = params;
    this.pageNum = 1;
    this.query();
  }
  query() {
    this.selectValue = null;
    this.loading = true;
    this.http.post('/memberGrowthRecord/list', { paramJson: JSON.stringify(Object.assign(this.queryParams)), pageNum: this.pageNum, pageSize:10 }, false).then(res => {
      this.loading = false;
      //this.checkAuth = res.data.checkAuth;
      this.totalPage = res.result.totalPage;
      res.result.list.map(item => {
        if(item.type == 0){
          item.eventIcon = 'https://ylbb-wxapp.oss-cn-beijing.aliyuncs.com/assessment/cl1.png';
        }else if(item.type == 1){ 
          item.eventIcon = 'https://ylbb-wxapp.oss-cn-beijing.aliyuncs.com/assessment/cl2.png';
        }else if(item.type == 2){ 
          item.eventIcon = 'https://ylbb-wxapp.oss-cn-beijing.aliyuncs.com/assessment/cl3.png';
        }else if(item.type == 4){ 
          item.eventIcon = 'https://ylbb-wxapp.oss-cn-beijing.aliyuncs.com/assessment/cl4.png';
        }
        try {
          item.appContent = JSON.parse(item.appContent);
          item.appContent.content = item.appContent.content.split('|~!|').join('<i>|</i>');
        } catch (error) {
          item.appContent = { content: '', videoUrl: '', imgUrlList: [] };
        }
        return item;
      });
      this.dataSet = res.result.list;
    })
  }

  showEventList: boolean;

  showExamine: boolean;
  operExamine() {
    this.showExamine = true;
  }


  previewUrl(url) {
    window.open(url)
  }

  batchStatus(status) {
    if (this.selectValue) {
      this.http.post('/memberGrowthRecord/modify', {
        paramJson: JSON.stringify({
          id: this.selectValue,
          status
        })
      }).then(res => {
        if(res.code == 1000){
          this.showExamine = false;
          this.query();
        }else{
          this.message.warning(res.info);
        }

      });
    } else {
      this.message.warning('请选择需要审核的数据');
    }
  }

}
