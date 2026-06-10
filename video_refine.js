// video_refine.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import VideoRefine from '../src/video_refine';

describe('VideoRefine component', () => {
  const mockVideoSrc = '/videos/generated.mp4';

  test('renders video element with correct src', () => {
    render(<VideoRefine videoSrc={mockVideoSrc} />);
    const video = screen.getByTestId('preview-video');
    expect(video).toHaveAttribute('src', mockVideoSrc);
  });

  test('shows error when video fails to load', async () => {
    render(<VideoRefine videoSrc="/invalid.mp4" />);
    const errorMsg = await screen.findByText(/failed to load video/i);
    expect(errorMsg).toBeInTheDocument();
  });

  test('enables share button after a refinement action', () => {
    render(<VideoRefine videoSrc={mockVideoSrc} />);
    const shareBtn = screen.getByRole('button', { name: /share/i });
    expect(shareBtn).toBeDisabled();

    const trimBtn = screen.getByRole('button', { name: /trim/i });
    fireEvent.click(trimBtn);

    expect(shareBtn).toBeEnabled();
  });

  test('updates video attributes on refinement', () => {
    render(<VideoRefine videoSrc={mockVideoSrc} />);
    const overlayBtn = screen.getByRole('button', { name: /add overlay/i });
    fireEvent.click(overlayBtn);

    const video = screen.getByTestId('preview-video');
    // Assume overlay adds a watermark that changes width
    expect(video).toHaveAttribute('width', '1920');
  });
});