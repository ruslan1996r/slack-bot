const example = {
  "messages": [
    {
      "event": "incident.trigger",
      "log_entries": [
        {
          "id": "R5ZJ57BG6KJR0UWHSAK7HBUB16",
          "type": "trigger_log_entry",
          "summary": "Triggered through the website",
          "self": "https://api.pagerduty.com/log_entries/R5ZJ57BG6KJR0UWHSAK7HBUB16",
          "html_url": "https://dev-ssmall.pagerduty.com/incidents/PXUDI1N/log_entries/R5ZJ57BG6KJR0UWHSAK7HBUB16",
          "created_at": "2021-07-13T17:11:25Z",
          "agent": {
            "id": "PYMEQRB",
            "type": "user_reference",
            "summary": "Ruslik Ruslik",
            "self": "https://api.pagerduty.com/users/PYMEQRB",
            "html_url": "https://dev-ssmall.pagerduty.com/users/PYMEQRB"
          },
          "channel": {
            "type": "web_trigger",
            "summary": "Taaaatle",
            "subject": "Taaaatle",
            "details": null,
            "details_omitted": false,
            "body_omitted": false
          },
          "service": {
            "id": "PPHZNQX",
            "type": "service_reference",
            "summary": "test_service",
            "self": "https://api.pagerduty.com/services/PPHZNQX",
            "html_url": "https://dev-ssmall.pagerduty.com/service-directory/PPHZNQX"
          },
          "incident": {
            "id": "PXUDI1N",
            "type": "incident_reference",
            "summary": "[#31] Taaaatle",
            "self": "https://api.pagerduty.com/incidents/PXUDI1N",
            "html_url": "https://dev-ssmall.pagerduty.com/incidents/PXUDI1N"
          },
          "teams": [

          ],
          "contexts": [

          ],
          "event_details": {
            "description": "Taaaatle"
          }
        }
      ],
      "webhook": {
        "endpoint_url": "https://ba00468f9ef5.ngrok.io",
        "name": "My_hook",
        "description": null,
        "webhook_object": {
          "id": "PPHZNQX",
          "type": "service_reference",
          "summary": "test_service",
          "self": "https://api.pagerduty.com/services/PPHZNQX",
          "html_url": "https://dev-ssmall.pagerduty.com/service-directory/PPHZNQX"
        },
        "config": {
          "referer": "https://dev-ssmall.pagerduty.com/services/PPHZNQX/integrations?service_profile=1"
        },
        "outbound_integration": {
          "id": "PJFWPEP",
          "type": "outbound_integration_reference",
          "summary": "Generic V2 Webhook",
          "self": "https://api.pagerduty.com/outbound_integrations/PJFWPEP",
          "html_url": null
        },
        "accounts_addon": null,
        "id": "PEQDH8P",
        "type": "webhook",
        "summary": "My_hook",
        "self": "https://api.pagerduty.com/webhooks/PEQDH8P",
        "html_url": null
      },
      "incident": {
        "incident_number": 31,
        "title": "Testing123",
        "description": "Taaaatle",
        "created_at": "2021-07-13T17:11:25Z",
        "status": "triggered",
        "incident_key": "09a8e370ca61470a900656fc05620568",
        "service": {
          "id": "PPHZNQX",
          "name": "test_service",
          "description": null,
          "created_at": "2021-07-06T09:59:09Z",
          "updated_at": "2021-07-06T09:59:09Z",
          "status": "critical",
          "teams": [

          ],
          "alert_creation": "create_alerts_and_incidents",
          "addons": [
            {
              "id": "P9NN0XS",
              "type": "incident_show_addon_reference",
              "summary": "Test",
              "self": "https://api.pagerduty.com/addons/P9NN0XS",
              "html_url": null
            }
          ],
          "scheduled_actions": [

          ],
          "support_hours": null,
          "last_incident_timestamp": "2021-07-13T17:11:25Z",
          "escalation_policy": {
            "id": "PE3ZT6U",
            "type": "escalation_policy_reference",
            "summary": "test_service-ep",
            "self": "https://api.pagerduty.com/escalation_policies/PE3ZT6U",
            "html_url": "https://dev-ssmall.pagerduty.com/escalation_policies/PE3ZT6U"
          },
          "incident_urgency_rule": {
            "type": "constant",
            "urgency": "high"
          },
          "acknowledgement_timeout": null,
          "auto_resolve_timeout": null,
          "alert_grouping": "intelligent",
          "alert_grouping_timeout": 2,
          "alert_grouping_parameters": {
            "type": "intelligent",
            "config": null
          },
          "integrations": [
            {
              "id": "PGYGHV4",
              "type": "event_transformer_api_inbound_integration_reference",
              "summary": "Amazon CloudWatch",
              "self": "https://api.pagerduty.com/services/PPHZNQX/integrations/PGYGHV4",
              "html_url": "https://dev-ssmall.pagerduty.com/services/PPHZNQX/integrations/PGYGHV4"
            },
            {
              "id": "PF8GVR0",
              "type": "app_event_transform_inbound_integration_reference",
              "summary": "test_service - Sentry",
              "self": "https://api.pagerduty.com/services/PPHZNQX/integrations/PF8GVR0",
              "html_url": "https://dev-ssmall.pagerduty.com/services/PPHZNQX/integrations/PF8GVR0"
            }
          ],
          "metadata": {

          },
          "response_play": null,
          "type": "service",
          "summary": "test_service",
          "self": "https://api.pagerduty.com/services/PPHZNQX",
          "html_url": "https://dev-ssmall.pagerduty.com/service-directory/PPHZNQX"
        },
        "assignments": [
          {
            "at": "2021-07-13T17:11:25Z",
            "assignee": {
              "id": "PYMEQRB",
              "type": "user_reference",
              "summary": "Ruslik Ruslik",
              "self": "https://api.pagerduty.com/users/PYMEQRB",
              "html_url": "https://dev-ssmall.pagerduty.com/users/PYMEQRB"
            }
          }
        ],
        "assigned_via": "escalation_policy",
        "last_status_change_at": "2021-07-13T17:11:25Z",
        "first_trigger_log_entry": {
          "id": "R5ZJ57BG6KJR0UWHSAK7HBUB16",
          "type": "trigger_log_entry_reference",
          "summary": "Triggered through the website",
          "self": "https://api.pagerduty.com/log_entries/R5ZJ57BG6KJR0UWHSAK7HBUB16",
          "html_url": "https://dev-ssmall.pagerduty.com/incidents/PXUDI1N/log_entries/R5ZJ57BG6KJR0UWHSAK7HBUB16"
        },
        "alert_counts": {
          "all": 0,
          "triggered": 0,
          "resolved": 0
        },
        "is_mergeable": true,
        "escalation_policy": {
          "id": "PE3ZT6U",
          "type": "escalation_policy_reference",
          "summary": "test_service-ep",
          "self": "https://api.pagerduty.com/escalation_policies/PE3ZT6U",
          "html_url": "https://dev-ssmall.pagerduty.com/escalation_policies/PE3ZT6U"
        },
        "teams": [

        ],
        "impacted_services": [
          {
            "id": "PPHZNQX",
            "type": "service_reference",
            "summary": "test_service",
            "self": "https://api.pagerduty.com/services/PPHZNQX",
            "html_url": "https://dev-ssmall.pagerduty.com/service-directory/PPHZNQX"
          }
        ],
        "pending_actions": [

        ],
        "acknowledgements": [

        ],
        "basic_alert_grouping": null,
        "alert_grouping": null,
        "last_status_change_by": {
          "id": "PPHZNQX",
          "type": "service_reference",
          "summary": "test_service",
          "self": "https://api.pagerduty.com/services/PPHZNQX",
          "html_url": "https://dev-ssmall.pagerduty.com/service-directory/PPHZNQX"
        },
        "metadata": {

        },
        "external_references": [

        ],
        "priority": {
          "id": "PQPQ5ZY",
          "type": "priority",
          "summary": "SEV-2",
          "self": "https://api.pagerduty.com/priorities/PQPQ5ZY",
          "html_url": null,
          "account_id": "PW2ZFB9",
          "color": "eb6016",
          "created_at": "2021-07-07T09:22:38Z",
          "description": "",
          "name": "SEV-2",
          "order": 2097152,
          "schema_version": 0,
          "updated_at": "2021-07-07T09:23:25Z"
        },
        "incidents_responders": [

        ],
        "responder_requests": [

        ],
        "subscriber_requests": [

        ],
        "urgency": "high",
        "id": "PXUDI1N",
        "type": "incident",
        "summary": "[#31] Taaaatle",
        "self": "https://api.pagerduty.com/incidents/PXUDI1N",
        "html_url": "https://dev-ssmall.pagerduty.com/incidents/PXUDI1N",
        "alerts": [

        ]
      },
      "id": "5b33ec38-e3fd-11eb-b517-0242c0a82a05",
      "created_on": "2021-07-13T17:11:26Z",
      "account_features": {
        "response_automation": true
      },
      "account_id": "PW2ZFB9"
    }
  ]
}