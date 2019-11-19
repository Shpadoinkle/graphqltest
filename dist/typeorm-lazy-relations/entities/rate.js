"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const recipe_1 = require("./recipe");
let Rate = class Rate {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Rate.prototype, "id", void 0);
__decorate([
    src_1.Field(type => src_1.Int),
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Rate.prototype, "value", void 0);
__decorate([
    src_1.Field(type => user_1.User),
    typeorm_1.ManyToOne(type => user_1.User, { lazy: true }),
    __metadata("design:type", Object)
], Rate.prototype, "user", void 0);
__decorate([
    src_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Rate.prototype, "date", void 0);
__decorate([
    typeorm_1.ManyToOne(type => recipe_1.Recipe, { lazy: true }),
    __metadata("design:type", Object)
], Rate.prototype, "recipe", void 0);
Rate = __decorate([
    typeorm_1.Entity(),
    src_1.ObjectType()
], Rate);
exports.Rate = Rate;
