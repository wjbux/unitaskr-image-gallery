import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimateModule } from 'primeng/animate';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { AlbumComponent } from './album/album.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewAlbumComponent } from './dialogs/new-album/new-album.component';
import { NewImageComponent } from './dialogs/new-image/new-image.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AlbumService } from './services/album/album.service';
import { ImageService } from './services/image/image.service';

export const primeModules = [
	AnimateModule,
	BreadcrumbModule,
	ButtonModule,
	CalendarModule,
	CheckboxModule,
	ConfirmDialogModule,
	ContextMenuModule,
	DataViewModule,
	DialogModule,
	DividerModule,
	DropdownModule,
	DynamicDialogModule,
	FileUploadModule,
	ImageModule,
	InputGroupAddonModule,
	InputGroupModule,
	InputNumberModule,
	InputSwitchModule,
	InputTextModule,
	InputTextareaModule,
	MenuModule,
	MenubarModule,
	MultiSelectModule,
	PasswordModule,
	RadioButtonModule,
	SelectButtonModule,
	SidebarModule,
	SliderModule,
	StepsModule,
	StyleClassModule,
	TableModule,
	TabMenuModule,
	TabViewModule,
	TagModule,
	ToastModule,
	TreeModule,
];

@NgModule({
	declarations: [AppComponent, GalleryComponent, AlbumComponent, NewAlbumComponent, NewImageComponent],
	imports: [
		...primeModules,
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
	providers: [ConfirmationService, DialogService, MessageService, ImageService, AlbumService],
	bootstrap: [AppComponent],
})
export class AppModule {}
