!function(a,b){b.fieldTypes.repeater=function(c,d){var e=c.find(".contentblocks-repeater-wrapper"),f=tmpl("contentblocks-repeater-item"),g=d.properties&&d.properties.max_items?d.properties.max_items:0,h=d.properties&&d.properties.min_items?d.properties.min_items:0,i=!d.properties||"undefined"==typeof d.properties.add_first_item||b.toBoolean(d.properties.add_first_item),j=e.siblings(".contentblocks-field-actions-bottom, .contentblocks-field-actions-top"),k={init:function(){if(d.rows&&a.isArray(d.rows)&&d.rows.length>0)a.each(d.rows,function(a,b){k.addRow(b)});else if(h>1)for(var f=0;f<h;f++)this.addRow();else i&&this.addRow();h>0&&h===g&&(c.addClass("contentblocks-repeater-fixed-count"),1==h&&c.addClass("contentblocks-repeater-single-item")),j.on("click",".contentblocks-repeater-add-item",k.addEmptyRow),c.on("click",".contentblocks-repeater-delete-row",k.deleteRow),c.find("> .contentblocks-field-wrap > .contentblocks-field").on("click","> .contentblocks-repeater-expanded",function(){a(this).removeClass("contentblocks-repeater-expanded").addClass("contentblocks-repeater-collapsed").text("+").closest(".contentblocks-field-repeater").children(".contentblocks-repeater-wrapper").slideUp(300,function(){b.fixColumnHeights()})}).on("click","> .contentblocks-repeater-collapsed",function(){a(this).removeClass("contentblocks-repeater-collapsed").addClass("contentblocks-repeater-expanded").text("-").closest(".contentblocks-field-repeater").children(".contentblocks-repeater-wrapper").slideDown(300,function(){b.fixColumnHeights()})}),c.on("click","> .contentblocks-field-wrap > .contentblocks-field > .contentblocks-repeater-wrapper > .contentblocks-repeater-row > .contentblocks-repeater-item-expanded",function(){a(this).removeClass("contentblocks-repeater-item-expanded").addClass("contentblocks-repeater-item-collapsed").text("+").closest(".contentblocks-repeater-row").children(".contentblocks-repeater-item-wrapper").slideUp(300,function(){b.fixColumnHeights()})}).on("click","> .contentblocks-field-wrap > .contentblocks-field > .contentblocks-repeater-wrapper > .contentblocks-repeater-row > .contentblocks-repeater-item-collapsed",function(){a(this).removeClass("contentblocks-repeater-item-collapsed").addClass("contentblocks-repeater-item-expanded").text("-").closest(".contentblocks-repeater-row").children(".contentblocks-repeater-item-wrapper").slideDown(300,function(){b.fixColumnHeights()})}),("0"===g||0===g||g>1)&&e.sortable({items:"> li",forceHelperSize:!0,forcePlaceholderSize:!0,placeholder:"ui-sortable-placeholder",tolerance:"pointer",cursor:"move",cancel:"input,textarea,button,select,option,.prevent-drag",update:function(a,c){c.item.trigger("contentblocks:field_dragged"),b.fixColumnHeights(),b.fireChange()},start:function(a,b){if(b.placeholder.height(b.item.height()),window.CKEDITOR){var c=b.item.find(".cke");if(c.length>0){var d=c.attr("id").replace("cke_","");console.log(d,CKEDITOR.instances[d]),CKEDITOR.instances[d]&&(b.item.data("ckeditor-id",d),b.item.data("ckeditor-config",CKEDITOR.instances[d].config),CKEDITOR.instances[d].destroy(),CKEDITOR.remove(d))}}},stop:function(b,c){if(window.tinymce){var d=c.item.find(".mceEditor");if(d.length>0){var e=a(d[0]).attr("id").replace("textarea_parent","textarea");tinymce.execCommand("mceRemoveControl",!0,e),tinymce.execCommand("mceAddControl",!0,e)}var f=c.item.find(".mce-tinymce");if(f.length>0){var g=f.siblings("textarea").attr("id");tinymce.execCommand("mceRemoveEditor",!0,g),tinymce.execCommand("mceAddEditor",!0,g)}}if(window.CKEDITOR){var h=c.item.data("ckeditor-id"),i=c.item.data("ckeditor-config");h&&CKEDITOR.replace(h,i)}}})},deleteRow:function(){var c=e.children().length;c>h&&(a(this).closest(".contentblocks-repeater-row").remove(),c--),g>0&&c==g-1&&j.find(".contentblocks-repeater-add-item").show(),b.fixColumnHeights()},addEmptyRow:function(){if(g>0){var c=e.children().length;if(c>=g)return void b.alert(_("contentblocks.repeater.max_items_reached",{max:g}))}k.addRow({},a(this).data("target"))},addRow:function(i,k){i=i||{};var l=a(f({}));k&&"bottom"!=k?e.prepend(l):e.append(l),a.each(d.subfields,function(c,d){var e=a.extend(!0,{},d);i[d.parent_properties.key]&&(e=a.extend(!0,{},e,i[d.parent_properties.key]));var f=b.addField(l.children("ul"),d.id,e,"bottom");e.parent_properties.width>0&&f.css("width",e.parent_properties.width+"%"),f.data("repeater-key",e.parent_properties.key)});var m=e.children().length;g>0&&m==g&&j.find(".contentblocks-repeater-add-item").hide(),h>0&&m>h&&c.find(".contentblocks-repeater-delete-row").show(),b.fixColumnHeights()},getData:function(){var c=[];return e.children(".contentblocks-repeater-row").each(function(d,e){var f={};e=a(e),e.children("ul").children("li").each(function(c,d){d=a(d);var e=d.attr("id"),g=b.generatedContentFields[e],h=d.data("repeater-key");if(g){var i=g.getData();i.fieldId=e,f[h]=i}else console&&console.error("input not found with id",e)}),c.push(f)}),{rows:c}}};return k}}(vcJquery,ContentBlocks);