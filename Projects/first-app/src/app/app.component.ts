import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from './services/groups.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'first-app';
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnsToDisplay = ['company'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: any | null;

  constructor(
    private service: GroupsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit() {
    this.getGroups();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getGroups() {
    this.service.getGroups().subscribe((res: any) => {

      let Data: any[];

      // grouping by key
      Data = res.reduce(function (r: any, a: any) {
        r[a.group] = r[a.group] || [];
        r[a.group].push(a);
        return r;
      }, Object.create(null));

      let converted_res = Object.entries(Data).map((user) => ({
        group_name: user[0],
        value: user[1],
      }));

      this.dataSource = new MatTableDataSource(converted_res);
    });
  }
}
