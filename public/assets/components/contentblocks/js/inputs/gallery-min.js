!function(a,b){b.fieldTypes.gallery=function(c,d){var e={imageCount:0,fileBrowser:!1,source:d.properties.source>0?d.properties.source:ContentBlocksConfig["image.source"],directory:d.properties.directory};return e.init=function(){this.initUpload(),(d.properties.thumbnail_size>0||d.properties.thumbnail_size&&d.properties.thumbnail_size.length>1)&&(d.properties.thumb_size="specified"),c.find(".contentblocks-field-gallery-list").addClass("gallery-size-"+d.properties.thumb_size),c.find(".contentblocks-field-upload").on("click",function(){c.find(".contentblocks-field-upload-field").click()}),c.find(".contentblocks-field-gallery-choose").on("click",a.proxy(function(){this.chooseImage()},this)),c.find(".contentblocks-field-gallery-url").on("click",a.proxy(function(){this.promptImage()},this)),MODx.load({xtype:"modx-treedrop",target:c,targetEl:c.get(0),onInsert:function(a){e.addImageFromUrl(a)}}),a.isArray(d.images)&&a.each(d.images,function(a,b){e.imageCount++,b.id=d.generated_id+"-image"+e.imageCount,b.width=b.width||0,b.height=b.height||0,e.addImage(b,"init")}),c.find(".gallery-image-holder").sortable({connectWith:".gallery-image-holder",forceHelperSize:!0,forcePlaceholderSize:!0,placeholder:"contentblocks-gallery-placeholder",tolerance:"pointer",cursor:"move",update:function(){b.fixColumnHeights(),b.fireChange()},start:function(a,b){b.placeholder.height(b.item.height())}}),b.toBoolean(d.properties.show_description)||c.addClass("no-description"),b.toBoolean(d.properties.show_link_field)||c.addClass("no-link-field")},e.chooseImage=function(){var a=d.properties.max_images,f=c.find(".gallery-image-holder").find("li").length;if(a>0&&f>=a)return b.alert(_("contentblocks.max_images_reached",{max:a})),!1;var g=MODx.load({xtype:"modx-browser",id:Ext.id(),multiple:!0,listeners:{select:function(a){e.chooseImageCallback(a)}},allowedFileTypes:d.properties.file_types,hideFiles:!0,title:_("contentblocks.choose_image"),source:e.source});g.setSource(e.source),g.show()},e.chooseImageCallback=function(a){var b=a.fullRelativeUrl;"http"!=b.substr(0,4)&&"/"!=b.substr(0,1)&&(b=MODx.config.base_url+b),e.imageCount++;var d=c.attr("id")+"-image"+e.imageCount,f=a.size,g=a.ext;this.addImage({url:b,title:a.filename,description:"",link:"",id:d,size:f,width:a.image_width,height:a.image_height,extension:g},"choose")},e.promptImage=function(){Ext.Msg.prompt(_("contentblocks.from_url_title"),_("contentblocks.from_url_prompt"),function(a,b,c){"ok"===a&&e.addImageFromUrl(b)},this)},e.addImageFromUrl=function(f){return!f||f.length<3?void b.alert("No URL provided."):(c.addClass("contentblocks-field-loading"),void a.ajax({dataType:"json",url:ContentBlocksConfig.connector_url,type:"POST",beforeSend:function(a,b){b.crossDomain||a.setRequestHeader("modAuth",MODx.siteId)},data:{action:"content/image/download",field:d.field,resource:ContentBlocksResource&&ContentBlocksResource.id?ContentBlocksResource.id:0,url:f},context:this,success:function(a){if(c.removeClass("contentblocks-field-loading"),a.success){var d=b.utilities.normaliseUrls(a.object.url);e.imageCount++;var f=c.attr("id")+"-image"+e.imageCount;this.addImage({url:d.cleanedSrc,title:a.object.filename,description:"",link:"",id:f,size:a.object.size,width:a.object.width,height:a.object.height,extension:a.object.extension},"choose")}else b.alert(a.message)}}))},e.addImage=function(e,f){var g=c.find(".gallery-image-holder"),h=b.utilities.normaliseUrls(e.url);e.url=h.cleanedSrc,e.description=e.description||"",e.link=e.link||"",e.thumbDisplay=d.properties.thumbnail_size?b.utilities.getThumbnailUrl(e.url,d.properties.thumbnail_size):h.displaySrc,g.append(tmpl("contentblocks-field-gallery-item",e));var i=a("#"+e.id);i.find(".contentblocks-gallery-image-delete").on("click",function(){i.fadeOut(function(){i.remove(),b.fixColumnHeights(),b.fireChange()})}),b.toBoolean(d.properties.show_link_field)&&b.initializeLinkField(i.find(".linkfield"),d)},e.initUpload=function(){var f=c.attr("id"),g=d.properties.max_images;c.find("#"+f+"-upload").fileupload({url:ContentBlocksConfig.connectorUrl+"?action=content/image/upload",dataType:"json",dropZone:a("#"+f),progressInterval:250,paramName:"file",multiple:!0,pasteZone:null,add:function(d,h){var i=c.find(".gallery-image-holder").find("li").length;if(g>0&&i>=g)return b.alert(_("contentblocks.max_images_reached",{max:g})),!1;e.imageCount++;var j=f+"-image"+e.imageCount;h.files[0].ext=h.files[0].name.split(".").pop(),e.addImage({title:h.files[0].name,url:"",id:j,size:h.files[0].size,extension:h.files[0].ext},"upload"),h.domId="#"+j;var k=a(h.domId);if(k.addClass("uploading"),h.files[0].size<7e5&&window.FileReader){var l=new FileReader;l.onload=function(a){k.find("img").attr("src",a.target.result),b.fixColumnHeights()},l.readAsDataURL(h.files[0])}setTimeout(function(){h.submit()},1e3),b.fireChange()},done:function(c,e){var f=a(e.domId);if(e.result.success){var g=e.result.object,h=b.utilities.normaliseUrls(g.url);f.find(".url").val(h.cleanedSrc),f.find(".size").val(g.size),f.find(".width").val(g.width),f.find(".height").val(g.height),f.find(".extension").val(g.extension);var i=d.properties.thumbnail_size?b.utilities.getThumbnailUrl(g.url,d.properties.thumbnail_size):h.displaySrc;f.find("img").attr("src",i),f.removeClass("uploading")}else{var j=_("contentblocks.upload_error",{file:e.files[0].filename,message:e.result.message});e.files[0].size>1572864&&(j+=_("contentblocks.upload_error.file_too_big")),b.alert(j),f.remove()}setTimeout(function(){b.fixColumnHeights()},150)},fail:function(c,d){var e=_("contentblocks.upload_error",{file:d.files[0].filename,message:d.result.message});d.files[0].size>1572864&&(e+=_("contentblocks.upload_error.file_too_big")),b.alert(e),a(d.domId).remove(),b.fixColumnHeights()},formData:function(){return[{name:"HTTP_MODAUTH",value:MODx.siteId},{name:"resource",value:MODx.request.id||0},{name:"field",value:d.id}]},progress:function(b,c){var d=parseInt(c.loaded/c.total*100,10)+"%";a(c.domId).find(".upload-progress .bar").width(d)}}).on("fileuploaddragover",function(){a(this).css("background","red")})},e.getData=function(){var d=[];return c.find(".gallery-image-holder li").each(function(c,e){var f=a(e),g=f.find("input[id].linkfield"),h={url:f.find(".url").val(),title:f.find(".title").val(),description:f.find(".description").val(),link:g.val(),linkType:b.getLinkFieldDataType(g.val()),size:f.find(".size").val(),width:f.find(".width").val(),height:f.find(".height").val(),extension:f.find(".extension").val()};d.push(h)}),{images:d}},e}}(vcJquery,ContentBlocks);
//# sourceMappingURL=gallery-min.js.map