import {array,text,date,unique,issue,escape,table,issuesHTML} from './util.js';
export const guide='Supply practice, asOf and pages with page_id, url, content_type, owner, reviewer, last_reviewed, next_review_due, status, content_version, reviewed_version and source_note. Approval requires a reviewer and valid date, and must match the current content version.';
export function analyse(input){
 text(input.practice,'practice');date(input.asOf,'asOf');const issues=[];
 const pages=unique(array(input.pages,'pages'),'page_id').map(row=>{
  text(row.url,'url');text(row.content_type,'content_type');text(row.owner,'owner');
  if(!['draft','awaiting review','approved'].includes(row.status))throw Error('Unknown editorial status');
  if(row.last_reviewed)date(row.last_reviewed,'last_reviewed');if(row.next_review_due)date(row.next_review_due,'next_review_due');
  if(row.last_reviewed&&row.last_reviewed>input.asOf)throw Error('A completed review cannot be in the future');
  if(row.status==='approved'&&(!row.reviewer||!row.last_reviewed))throw Error('Approved content requires reviewer and review date');
  if(row.status==='approved'&&(!row.content_version||!row.reviewed_version))throw Error('Approved content requires current and reviewed versions');
  if(row.last_reviewed&&row.next_review_due&&row.next_review_due<row.last_reviewed)throw Error('Next review cannot precede last review');
  let state=row.status;
  if(row.status==='approved'&&row.content_version!==row.reviewed_version){state='changed since approval';issues.push(issue('changed','Current version needs a new review',row.page_id));}
  if(row.next_review_due&&row.next_review_due<input.asOf){state=state==='approved'?'review overdue':state+'; review overdue';issues.push(issue('overdue','Scheduled editorial review is overdue',row.page_id));}
  if(!row.next_review_due)issues.push(issue('date','Assign the next review date',row.page_id));
  return {...row,state};
 });
 return {title:input.practice+' editorial review queue',summary:'Internal editorial record as of '+input.asOf+'. Review status does not assess legal or regulatory compliance.',pages,issues,markdown:pages.map(p=>'- '+p.page_id+': '+p.state+'; owner '+p.owner+'; next check '+(p.next_review_due||'Unscheduled')).join('\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p>'+table(['Page','State','Owner','Reviewed','Next review'],r.pages.map(p=>[p.page_id,p.state,p.owner,p.last_reviewed||'Not reviewed',p.next_review_due||'Unscheduled']))+issuesHTML(r.issues);
