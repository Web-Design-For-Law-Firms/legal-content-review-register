import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Law Firm Website Brief Builder",
  "short": "Plan a clearer first impression for your firm",
  "audience": "For law firm partners and practice managers",
  "summary": "Bring your practice areas, client needs and enquiry process into a concise website brief.",
  "button": "Prepare my website brief",
  "filename": "law-firm-website-brief",
  "eyebrow": "A clear brief. A considered website.",
  "time": "About 5 minutes",
  "outcome": "A content and enquiry brief for your website project, ready for internal review.",
  "layout": "legal",
  "intro": "Use public, general information about your firm. Keep client names, matter details and confidential documents out of this tool.",
  "note": "This supports website planning. It does not provide legal advice or assess regulatory compliance.",
  "fields": [
    {
      "id": "business",
      "label": "Firm name",
      "help": "",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "areas",
      "label": "Which practice areas should the website focus on?",
      "options": [
        "Commercial",
        "Employment",
        "Property",
        "Family",
        "Wills and probate",
        "Dispute resolution",
        "Other"
      ],
      "help": "",
      "type": "checks",
      "wide": true
    },
    {
      "id": "clients",
      "label": "Who should the website help?",
      "help": "Describe your intended clients in general terms.",
      "required": true,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    },
    {
      "id": "intake",
      "label": "How should a new enquiry begin?",
      "options": [
        "Request a callback",
        "Call the office",
        "Send a short enquiry",
        "Arrange an introductory meeting"
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "fees",
      "label": "Do you have approved fee information ready?",
      "options": [
        [
          "yes",
          "Yes, approved for publication"
        ],
        [
          "review",
          "It needs review"
        ],
        [
          "no",
          "Not prepared yet"
        ]
      ],
      "help": "",
      "required": true,
      "type": "select"
    },
    {
      "id": "people",
      "label": "What should visitors know about the team?",
      "help": "Use approved roles, experience and professional information only.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    },
    {
      "id": "priority",
      "label": "What needs to work better on the new site?",
      "help": "For example: clients find the right team before they enquire.",
      "required": true,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    }
  ],
  "example": {
    "business": "Example Law Firm",
    "areas": [
      "Commercial",
      "Employment"
    ],
    "clients": "Owner-managed businesses looking for ongoing legal support.",
    "intake": "Request a callback",
    "fees": "review",
    "people": "Approved team biographies and named practice contacts.",
    "priority": "Visitors can find the right practice team and understand the enquiry process."
  }
};
export function evaluate(v){const areas=selected(v.areas);if(!areas.length)throw Error('Choose at least one practice area.');enumValue(v.fees,['yes','review','no'],'the status of fee information');return report(requireText(v.business,'your firm name')+': website brief','A starting point for your designer, writer and the firm’s appointed reviewer.',[section('Audience and objective',[requireText(v.clients,'the clients you want to help'),requireText(v.priority,'what needs to improve')]),section('Practice information to prepare',areas.map(a=>a+': explain the matters you handle, the appropriate team and how an initial enquiry works.')),section('The first enquiry',['Primary action: '+requireText(v.intake,'how enquiries should begin'),'Ask only for enough information to route the enquiry. Keep detailed matter information within the firm’s approved intake process.','Explain what happens after an enquiry and avoid implying that submitting a form establishes a client relationship.']),section('Material for internal approval',[clean(v.people)||'Prepare accurate team biographies and the professional information the firm approves for publication.',v.fees==='yes'?'Provide the approved fee wording and its review owner.':'Arrange a review of any fee information and publication obligations with the firm’s responsible person.','Have the responsible person approve final claims, practice descriptions, confidentiality wording and any relevant regulatory information.'])]);}
