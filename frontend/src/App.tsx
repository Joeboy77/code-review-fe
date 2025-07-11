import React, { useState } from 'react';
import { Form, Input, Button, Spin, Typography, Card, notification, Collapse, Badge, Switch, Skeleton, Row, Col, Space } from 'antd';
import { CopyOutlined, VideoCameraOutlined, CodeOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { Title, Text } = Typography;
const { Panel } = Collapse;
const API_URL = 'http://localhost:4000/review';
const VIDEO_API_URL = 'http://localhost:4000/video-explanation';
const VIDEO_STATUS_API_URL = 'http://localhost:4000/video-status';

function App() {
  const [url, setUrl] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoStatus, setVideoStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [altLoading, setAltLoading] = useState(false);
  const [altSolution, setAltSolution] = useState('');
  const [code, setCode] = useState('');
  const [issues, setIssues] = useState<any[]>([]);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [warning, setWarning] = useState('');

  const handleSubmit = async () => {
    setReview('');
    setCode('');
    setIssues([]);
    setAltSolution('');
    setWarning('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.review) {
        setReview(data.review);
        setCode(data.code || '');
        setIssues(data.issues || []);
        setWarning(data.warning || '');
        notification.success({ message: 'Review Complete', description: 'AI review is ready!' });
      } else {
        setReview('No review available.');
      }
    } catch (err) {
      notification.error({ message: 'Error', description: 'Failed to get review.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(review);
    notification.info({ message: 'Copied', description: 'Review copied to clipboard.' });
  };

  const handleGenerateVideo = async () => {
    setVideoLoading(true);
    setVideoStatus('Starting video generation...');
    setVideoUrl('');
    try {
      const res = await fetch(VIDEO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (!data.jobId) {
        setVideoLoading(false);
        notification.error({ message: 'Error', description: 'Failed to start video generation.' });
        return;
      }
      // Poll for video status
      pollVideoStatus(data.jobId);
    } catch (err) {
      setVideoLoading(false);
      notification.error({ message: 'Error', description: 'Failed to start video generation.' });
    }
  };

  const pollVideoStatus = (jobId: string) => {
    setVideoStatus('Processing video...');
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${VIDEO_STATUS_API_URL}?jobId=${jobId}`);
        const data = await res.json();
        if (data.videoUrl) {
          setVideoUrl(data.videoUrl);
          setVideoStatus('Video is ready!');
          setVideoLoading(false);
          clearInterval(interval);
        } else if (data.status) {
          setVideoStatus(`Status: ${data.status}`);
        }
      } catch (err) {
        setVideoStatus('Error checking video status.');
        setVideoLoading(false);
        clearInterval(interval);
      }
    }, 5000);
  };

  const handleAlternative = async () => {
    setAltLoading(true);
    setAltSolution('');
    try {
      const res = await fetch('http://localhost:4000/alternative-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (data.suggestion) {
        setAltSolution(data.suggestion);
        notification.success({ message: 'Alternative Solution Ready', description: 'AI suggestion is ready!' });
      } else {
        setAltSolution('No alternative solution available.');
      }
    } catch (err) {
      notification.error({ message: 'Error', description: 'Failed to get alternative solution.' });
    } finally {
      setAltLoading(false);
    }
  };

  // Helper to get lines to highlight
  const getHighlightedLines = () => {
    // If issues have line numbers, return as array
    if (issues.length && issues[0].line) {
      return issues.map((i: any) => i.line);
    }
    return [];
  };

  // Helper to get explanation for a line
  const getExplanationForLine = (line: number) => {
    const found = issues.find((i: any) => i.line === line);
    return found ? found.explanation : '';
  };

  // Helper to get issue for a line
  const getIssueForLine = (line: number) => {
    return issues.find((i: any) => i.line === line);
  };

  // Helper to get color for severity
  const getSeverityColor = (severity: string) => {
    switch ((severity || '').toLowerCase()) {
      case 'critical': return 'red';
      case 'warning': return 'orange';
      case 'info': return 'blue';
      default: return 'gray';
    }
  };

  // Helper to get icon for category (optional, can expand)
  const getCategoryIcon = (category: string) => {
    // Could use icons for Security, Performance, etc.
    return null;
  };

  // Severity breakdown
  const getSeverityBreakdown = () => {
    const counts: Record<string, number> = { Critical: 0, Warning: 0, Info: 0 };
    issues.forEach((i: any) => {
      const sev = (i.severity || 'Info').toLowerCase();
      if (sev === 'critical') counts.Critical++;
      else if (sev === 'warning') counts.Warning++;
      else counts.Info++;
    });
    return counts;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #23272f 0%, #1e1e1e 100%)'
          : 'linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        transition: 'background 0.3s',
      }}
    >
      <Card style={{ width: '100%', maxWidth: 1100, boxShadow: '0 4px 24px #0001', position: 'relative', minHeight: 600 }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
          <Col>
            <Title level={2} style={{ marginBottom: 0, color: darkMode ? '#fff' : undefined }}>AI Code Review Assistant</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 0, color: darkMode ? '#aaa' : undefined }}>
              Paste a GitHub file URL to get an instant AI review.
            </Text>
          </Col>
          <Col>
            <Switch
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              checked={darkMode}
              onChange={setDarkMode}
              style={{ marginLeft: 8 }}
            />
          </Col>
        </Row>
        <Form layout="vertical" onFinish={handleSubmit} style={{ marginBottom: 16 }}>
          <Form.Item label="GitHub File URL" required>
            <Input
              placeholder="https://github.com/user/repo/blob/branch/path/to/file.js"
              value={url}
              onChange={e => setUrl(e.target.value)}
              size="large"
              disabled={loading || videoLoading}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              disabled={!url || videoLoading}
            >
              Review Code
            </Button>
          </Form.Item>
        </Form>
        {loading && (
          <Skeleton active paragraph={{ rows: 10 }} style={{ marginTop: 32 }} />
        )}
        {!loading && review && (
          <>
            {/* Review summary and warning */}
            {warning && (
              <div style={{ marginBottom: 16 }}>
                <Card style={{ background: '#fffbe6', border: '1px solid #ffe58f' }}>
                  <Text type="warning">{warning}</Text>
                </Card>
              </div>
            )}
            <Card style={{ marginBottom: 24, background: darkMode ? '#23272f' : '#fafafa' }}>
              <Title level={3} style={{ color: darkMode ? '#fff' : undefined, marginBottom: 8 }}>AI Review Summary</Title>
              <Text style={{ fontSize: 16, color: darkMode ? '#fff' : undefined, whiteSpace: 'pre-wrap' }}>{review}</Text>
              <div style={{ marginTop: 16 }}>
                <Space size="large">
                  <Text strong>Total Issues: {issues.length}</Text>
                  <Badge color="red" text={`Critical: ${getSeverityBreakdown().Critical}`} />
                  <Badge color="orange" text={`Warning: ${getSeverityBreakdown().Warning}`} />
                  <Badge color="blue" text={`Info: ${getSeverityBreakdown().Info}`} />
                </Space>
              </div>
            </Card>
            <Row gutter={32}>
              {/* Left: Code with highlights */}
              <Col xs={24} md={14}>
                <Card style={{ background: darkMode ? '#1e1e1e' : '#fff', color: darkMode ? '#fff' : undefined, maxHeight: 600, overflow: 'auto' }}>
                  <Title level={4} style={{ color: darkMode ? '#fff' : undefined }}>Code (with highlights)</Title>
                  <SyntaxHighlighter
                    language="javascript"
                    style={oneDark}
                    showLineNumbers
                    wrapLines
                    lineProps={(lineNumber: number) => {
                      const highlight = getHighlightedLines().includes(lineNumber);
                      return {
                        style: highlight
                          ? {
                              background: '#fffae6',
                              position: 'relative',
                              cursor: 'pointer',
                              borderLeft: `4px solid ${getSeverityColor(getIssueForLine(lineNumber)?.severity)}`,
                            }
                          : {},
                        title: highlight ? getExplanationForLine(lineNumber) : undefined,
                        onClick: highlight ? () => setSelectedLine(lineNumber) : undefined,
                      };
                    }}
                  >
                    {code}
                  </SyntaxHighlighter>
                  {selectedLine && getIssueForLine(selectedLine) && (
                    <Card
                      size="small"
                      style={{
                        marginTop: 16,
                        background: darkMode ? '#222' : '#fafafa',
                        borderLeft: `4px solid ${getSeverityColor(getIssueForLine(selectedLine)?.severity)}`,
                      }}
                    >
                      <Space>
                        <Badge color={getSeverityColor(getIssueForLine(selectedLine)?.severity)} text={getIssueForLine(selectedLine)?.severity} />
                        <Text type="secondary">{getIssueForLine(selectedLine)?.category}</Text>
                      </Space>
                      <div style={{ marginTop: 8 }}>{getIssueForLine(selectedLine)?.explanation}</div>
                      <Button size="small" style={{ marginTop: 8 }} onClick={() => setSelectedLine(null)}>Close</Button>
                    </Card>
                  )}
                </Card>
              </Col>
              {/* Right: Issues/comments */}
              <Col xs={24} md={10}>
                {issues.length > 0 && (
                  <Card style={{ marginTop: 0, background: darkMode ? '#23272f' : '#fafafa' }}>
                    <Title level={5} style={{ color: darkMode ? '#fff' : undefined }}>Highlighted Issues</Title>
                    <ul style={{ paddingLeft: 16 }}>
                      {issues.map((issue, idx) => (
                        <li key={idx} style={{ marginBottom: 16, cursor: issue.line ? 'pointer' : 'default' }}>
                          <Space>
                            {issue.line ? <b>Line {issue.line}:</b> : issue.snippet ? <b>Snippet:</b> : null}
                            <Badge color={getSeverityColor(issue.severity)} text={issue.severity} />
                            <Text type="secondary">{issue.category}</Text>
                          </Space>
                          <div style={{ marginTop: 4 }}>{issue.explanation}</div>
                          {issue.line && (
                            <Button size="small" style={{ marginTop: 4 }} onClick={() => setSelectedLine(issue.line)}>
                              Jump to code
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </Col>
            </Row>
          </>
        )}
        {/* Alternative Solution and Video (unchanged) */}
        {!loading && review && (
          <>
            <Button
              icon={<CodeOutlined />}
              type="dashed"
              size="large"
              style={{ marginTop: 24, width: '100%' }}
              loading={altLoading}
              onClick={handleAlternative}
              disabled={altLoading}
            >
              Suggest Alternative Solution
            </Button>
            {altLoading && (
              <div style={{ textAlign: 'center', margin: '24px 0' }}>
                <Spin size="large" />
                <div style={{ marginTop: 8 }}>Generating alternative solution...</div>
              </div>
            )}
            {altSolution && !altLoading && (
              <Card style={{ marginTop: 24, background: darkMode ? '#23272f' : '#fafafa' }}>
                <Title level={4}>Alternative Solution</Title>
                <pre style={{ background: '#222', color: '#fff', padding: 16, borderRadius: 8, overflowX: 'auto' }}>{altSolution}</pre>
                <Button
                  icon={<CopyOutlined />}
                  size="small"
                  style={{ marginTop: 8 }}
                  onClick={() => { navigator.clipboard.writeText(altSolution); notification.info({ message: 'Copied', description: 'Alternative solution copied to clipboard.' }); }}
                >
                  Copy
                </Button>
              </Card>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

export default App;
