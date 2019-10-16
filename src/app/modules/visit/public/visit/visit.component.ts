import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { PreviewComponent } from '../preview/preview.component';
import { TableComponent } from 'src/app/ng-relax/components/table/table.component';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.less']
})
export class VisitComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  @Input() status: number;

  @Input() followStageId: number;
  pageNum: number;
  totalPage: number;
  dataSet: any[] = [];

  constructor(
    private http: HttpService,
    private drawer: NzDrawerService,
    private drawerRef: NzDrawerRef
  ) { }

  ngOnInit() {
    this.query();
  }
  query(){
    this.http.post('/retrunVisit/todayReturnVisit', { status: this.status,pageSize:10000, pageNum:1 }).then(res => {
      this.dataSet = res.result.list;
      this.totalPage = res.result.totalPage;
    });
  }
  loadData(pi: number): void {
    this.pageNum = pi;
    this.query();
  }
  preview(id) {
    const drawer = this.drawer.create({
      nzWidth: 960,
      nzContent: PreviewComponent,
      nzClosable: false,
      nzContentParams: { id, followStageId: this.followStageId }
    });
    drawer.afterClose.subscribe(res => {
      this.drawerRef.close(false);
      this.table._request();
    });
  }

}
